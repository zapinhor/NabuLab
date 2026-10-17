import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
type Category = "activities" | "deadlines" | "classes";

function escapeHtml(value: string) { return value.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }

export async function sendNabuNotificationEmail(input: {
  dedupeKey: string; category: Category; recipientUserId?: string | null; recipientEmail?: string | null;
  subject: string; heading: string; body: string; actionLabel: string; actionPath: string;
}) {
  const apiKey=process.env.RESEND_API_KEY?.trim();
  if(!apiKey) return {sent:false as const,reason:"not_configured"};
  const admin=createAdminClient();
  const claim=await admin.from("notification_email_deliveries").insert({
    dedupe_key:input.dedupeKey,
    recipient_user_id:input.recipientUserId??null,
    category:input.category,
    status:"failed",
    safe_error:"processing",
  }).select("id").single();
  if(claim.error){
    if(claim.error.code==="23505") return {sent:false as const,reason:"duplicate" as const};
    console.error("[notification-email] delivery claim failed",{category:input.category,code:claim.error.code});
    return {sent:false as const,reason:"claim_failed" as const};
  }
  const deliveryId=claim.data.id;
  let email=input.recipientEmail?.trim().toLowerCase()||null;
  if(input.recipientUserId){
    const [{data:profile},{data:preference}]=await Promise.all([
      admin.from("profiles").select("email").eq("id",input.recipientUserId).maybeSingle(),
      admin.from("notification_preferences").select("email_activities,email_deadlines,email_classes").eq("user_id",input.recipientUserId).maybeSingle(),
    ]);
    email=profile?.email?.trim().toLowerCase()||email;
    const preferenceKey=`email_${input.category}` as "email_activities"|"email_deadlines"|"email_classes";
    if(preference && preference[preferenceKey]===false){
      await admin.from("notification_email_deliveries").update({status:"skipped",safe_error:"preference_disabled"}).eq("id",deliveryId);
      return {sent:false as const,reason:"preference_disabled"};
    }
  }
  if(!email){
    await admin.from("notification_email_deliveries").update({safe_error:"email_unavailable"}).eq("id",deliveryId);
    return {sent:false as const,reason:"email_unavailable"};
  }
  const controller=new AbortController(); const timeout=setTimeout(()=>controller.abort(),10_000);
  let status:"sent"|"failed"="failed"; let safeError:string|null=null;
  try{
    const response=await fetch(RESEND_ENDPOINT,{method:"POST",headers:{authorization:`Bearer ${apiKey}`,"content-type":"application/json","idempotency-key":input.dedupeKey},signal:controller.signal,body:JSON.stringify({
      from:process.env.SUPPORT_EMAIL_FROM?.trim()||"NabuLab <suporte@nabulab.org>",to:[email],subject:input.subject,
      text:`${input.heading}\n\n${input.body}\n\nAcesse: https://nabulab.org${input.actionPath}`,
      html:`<div style="font-family:Arial,sans-serif;background:#F5F7FB;padding:24px"><div style="max-width:560px;margin:auto;background:white;border-radius:18px;padding:28px;border-top:6px solid #0B2D6B"><h1 style="color:#0B2D6B;font-size:24px">${escapeHtml(input.heading)}</h1><p style="color:#334155;line-height:1.6">${escapeHtml(input.body)}</p><a href="https://nabulab.org${input.actionPath}" style="display:inline-block;background:#3B82F6;color:white;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:10px">${escapeHtml(input.actionLabel)}</a><p style="margin-top:24px;color:#64748b;font-size:12px">Você pode ajustar estes e-mails em Notificações no NabuLab.</p></div></div>`,
    })});
    status=response.ok?"sent":"failed"; safeError=response.ok?null:`resend_${response.status}`;
  }catch(error){safeError=error instanceof Error&&error.name==="AbortError"?"timeout":"network";}
  finally{clearTimeout(timeout);}
  await admin.from("notification_email_deliveries").update({status,safe_error:safeError,sent_at:status==="sent"?new Date().toISOString():null}).eq("id",deliveryId);
  if(status==="failed") console.error("[notification-email] delivery failed",{category:input.category,reason:safeError});
  return {sent:status==="sent",reason:safeError};
}
