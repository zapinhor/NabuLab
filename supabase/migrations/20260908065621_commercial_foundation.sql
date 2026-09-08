-- NabuLab commercial foundation: auth profiles, multi-tenant organizations,
-- institutional roles, classes, invitations and auditable atomic workflows.

create extension if not exists pgcrypto with schema extensions;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create type public.organization_kind as enum ('school', 'course', 'other');
create type public.organization_role as enum ('director', 'coordinator', 'teacher', 'student');
create type public.invite_status as enum ('pending', 'accepted', 'declined', 'revoked', 'expired');
create type public.class_member_status as enum ('active', 'removed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  username text,
  full_name text not null default '',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_email_normalized check (email = lower(btrim(email))),
  constraint profiles_username_format check (
    username is null or username ~ '^[a-z0-9][a-z0-9._-]{2,31}$'
  )
);
create unique index profiles_email_unique on public.profiles (lower(email));
create unique index profiles_username_unique on public.profiles (lower(username)) where username is not null;

create table public.platform_admins (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  granted_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$'),
  kind public.organization_kind not null default 'school',
  logo_url text,
  primary_color text not null default '#0B2D6B' check (primary_color ~ '^#[0-9A-Fa-f]{6}$'),
  accent_color text not null default '#F4C430' check (accent_color ~ '^#[0-9A-Fa-f]{6}$'),
  settings jsonb not null default '{}'::jsonb check (jsonb_typeof(settings) = 'object'),
  is_active boolean not null default true,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.organization_role not null,
  joined_at timestamptz not null default now(),
  created_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);
create index organization_members_user_id_idx on public.organization_members (user_id, organization_id);
create index organization_members_role_idx on public.organization_members (organization_id, role);

create table public.organization_invites (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  email text not null,
  role public.organization_role not null,
  token_digest text not null unique,
  status public.invite_status not null default 'pending',
  expires_at timestamptz not null,
  created_by uuid not null references public.profiles(id),
  used_by uuid references public.profiles(id),
  used_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint organization_invites_email_normalized check (email = lower(btrim(email))),
  constraint organization_invites_expiration check (expires_at > created_at),
  constraint organization_invites_usage_consistent check (
    (status = 'accepted' and used_by is not null and used_at is not null)
    or (status <> 'accepted' and used_at is null)
  )
);
create index organization_invites_org_status_idx on public.organization_invites (organization_id, status, expires_at);
create index organization_invites_email_status_idx on public.organization_invites (lower(email), status, expires_at);
create unique index organization_invites_one_pending_idx
  on public.organization_invites (organization_id, lower(email)) where status = 'pending';

create table public.classes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 2 and 120),
  description text,
  academic_year smallint check (academic_year between 2000 and 2200),
  created_by uuid not null references public.profiles(id),
  is_archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index classes_organization_idx on public.classes (organization_id, is_archived, created_at desc);
create index classes_created_by_idx on public.classes (created_by);

create table public.class_members (
  class_id uuid not null references public.classes(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  status public.class_member_status not null default 'active',
  added_by uuid not null references public.profiles(id),
  joined_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (class_id, user_id)
);
create index class_members_user_id_idx on public.class_members (user_id, status, class_id);

create table public.class_invites (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  invitee_user_id uuid references public.profiles(id) on delete cascade,
  email text,
  token_digest text not null unique,
  status public.invite_status not null default 'pending',
  expires_at timestamptz not null,
  created_by uuid not null references public.profiles(id),
  used_by uuid references public.profiles(id),
  used_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint class_invites_target check (invitee_user_id is not null or email is not null),
  constraint class_invites_email_normalized check (email is null or email = lower(btrim(email))),
  constraint class_invites_expiration check (expires_at > created_at),
  constraint class_invites_usage_consistent check (
    (status = 'accepted' and used_by is not null and used_at is not null)
    or (status <> 'accepted' and used_at is null)
  )
);
create index class_invites_class_status_idx on public.class_invites (class_id, status, expires_at);
create index class_invites_user_status_idx on public.class_invites (invitee_user_id, status, expires_at);
create index class_invites_email_status_idx on public.class_invites (lower(email), status, expires_at) where email is not null;
create unique index class_invites_one_pending_user_idx
  on public.class_invites (class_id, invitee_user_id) where status = 'pending' and invitee_user_id is not null;

create table public.audit_events (
  id bigint generated always as identity primary key,
  organization_id uuid references public.organizations(id) on delete set null,
  actor_user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now()
);
create index audit_events_org_created_idx on public.audit_events (organization_id, created_at desc);
create index audit_events_actor_created_idx on public.audit_events (actor_user_id, created_at desc);

create function private.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles
for each row execute function private.set_updated_at();
create trigger organizations_set_updated_at before update on public.organizations
for each row execute function private.set_updated_at();
create trigger organization_members_set_updated_at before update on public.organization_members
for each row execute function private.set_updated_at();
create trigger organization_invites_set_updated_at before update on public.organization_invites
for each row execute function private.set_updated_at();
create trigger classes_set_updated_at before update on public.classes
for each row execute function private.set_updated_at();
create trigger class_members_set_updated_at before update on public.class_members
for each row execute function private.set_updated_at();
create trigger class_invites_set_updated_at before update on public.class_invites
for each row execute function private.set_updated_at();

create function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, username, full_name, avatar_url)
  values (
    new.id,
    lower(new.email),
    nullif(lower(btrim(new.raw_user_meta_data ->> 'username')), ''),
    coalesce(nullif(btrim(new.raw_user_meta_data ->> 'full_name'), ''), split_part(new.email, '@', 1)),
    nullif(btrim(new.raw_user_meta_data ->> 'avatar_url'), '')
  );
  return new;
exception
  when unique_violation then
    insert into public.profiles (id, email, full_name)
    values (new.id, lower(new.email), coalesce(split_part(new.email, '@', 1), 'Usuário'));
    return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users
for each row execute function private.handle_new_user();

create function private.current_email()
returns text
language sql
stable
security invoker
set search_path = ''
as $$
  select lower(coalesce((select auth.jwt() ->> 'email'), ''));
$$;

create function private.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.platform_admins pa where pa.user_id = (select auth.uid())
  );
$$;

create function private.is_org_member(p_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.organization_members om
    where om.organization_id = p_organization_id and om.user_id = (select auth.uid())
  );
$$;

create function private.has_org_role(p_organization_id uuid, p_roles public.organization_role[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.organization_members om
    where om.organization_id = p_organization_id
      and om.user_id = (select auth.uid())
      and om.role = any(p_roles)
  );
$$;

create function private.shares_organization(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_members mine
    join public.organization_members theirs using (organization_id)
    where mine.user_id = (select auth.uid()) and theirs.user_id = p_user_id
  );
$$;

create function private.can_manage_class(p_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.classes c
    join public.organization_members om on om.organization_id = c.organization_id
    where c.id = p_class_id
      and om.user_id = (select auth.uid())
      and om.role in ('director', 'coordinator', 'teacher')
      and (om.role <> 'teacher' or c.created_by = (select auth.uid()))
  );
$$;

create function private.has_pending_org_invite(p_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.organization_invites oi
    where oi.organization_id = p_organization_id
      and oi.email = private.current_email()
      and oi.status = 'pending'
      and oi.expires_at > now()
  );
$$;

create function private.has_pending_class_invite(p_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.class_invites ci
    where ci.class_id = p_class_id
      and ci.status = 'pending'
      and ci.expires_at > now()
      and (ci.invitee_user_id = (select auth.uid()) or ci.email = private.current_email())
  );
$$;

revoke all on all functions in schema private from public, anon, authenticated;
grant usage on schema private to authenticated;
grant execute on function private.current_email() to authenticated;
grant execute on function private.is_super_admin() to authenticated;
grant execute on function private.is_org_member(uuid) to authenticated;
grant execute on function private.has_org_role(uuid, public.organization_role[]) to authenticated;
grant execute on function private.shares_organization(uuid) to authenticated;
grant execute on function private.can_manage_class(uuid) to authenticated;
grant execute on function private.has_pending_org_invite(uuid) to authenticated;
grant execute on function private.has_pending_class_invite(uuid) to authenticated;

alter table public.profiles enable row level security;
alter table public.platform_admins enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.organization_invites enable row level security;
alter table public.classes enable row level security;
alter table public.class_members enable row level security;
alter table public.class_invites enable row level security;
alter table public.audit_events enable row level security;

create policy profiles_select on public.profiles for select to authenticated
using (
  id = (select auth.uid())
  or (select private.is_super_admin())
  or (select private.shares_organization(id))
);
create policy profiles_update_self on public.profiles for update to authenticated
using (id = (select auth.uid())) with check (id = (select auth.uid()));

create policy platform_admins_select on public.platform_admins for select to authenticated
using (user_id = (select auth.uid()) or (select private.is_super_admin()));

create policy organizations_select on public.organizations for select to authenticated
using (
  (select private.is_super_admin())
  or (select private.is_org_member(id))
  or (select private.has_pending_org_invite(id))
);
create policy organizations_update on public.organizations for update to authenticated
using (
  (select private.is_super_admin())
  or (select private.has_org_role(id, array['director']::public.organization_role[]))
) with check (
  (select private.is_super_admin())
  or (select private.has_org_role(id, array['director']::public.organization_role[]))
);

create policy organization_members_select on public.organization_members for select to authenticated
using ((select private.is_super_admin()) or (select private.is_org_member(organization_id)));
create policy organization_members_insert on public.organization_members for insert to authenticated
with check (
  (select private.is_super_admin())
  or (select private.has_org_role(organization_id, array['director']::public.organization_role[]))
);
create policy organization_members_update on public.organization_members for update to authenticated
using (
  (select private.is_super_admin())
  or (select private.has_org_role(organization_id, array['director']::public.organization_role[]))
) with check (
  (select private.is_super_admin())
  or (select private.has_org_role(organization_id, array['director']::public.organization_role[]))
);
create policy organization_members_delete on public.organization_members for delete to authenticated
using (
  (select private.is_super_admin())
  or (
    (select private.has_org_role(organization_id, array['director']::public.organization_role[]))
    and user_id <> (select auth.uid())
    and role <> 'director'
  )
);

create policy organization_invites_select on public.organization_invites for select to authenticated
using (
  (select private.is_super_admin())
  or (select private.has_org_role(organization_id, array['director']::public.organization_role[]))
  or (email = (select private.current_email()))
);
create policy organization_invites_update on public.organization_invites for update to authenticated
using (
  (select private.is_super_admin())
  or (select private.has_org_role(organization_id, array['director']::public.organization_role[]))
) with check (
  (select private.is_super_admin())
  or (select private.has_org_role(organization_id, array['director']::public.organization_role[]))
);

create policy classes_select on public.classes for select to authenticated
using (
  (select private.is_super_admin())
  or (select private.is_org_member(organization_id))
  or (select private.has_pending_class_invite(id))
);
create policy classes_insert on public.classes for insert to authenticated
with check (
  created_by = (select auth.uid())
  and (
    (select private.is_super_admin())
    or (select private.has_org_role(organization_id, array['director','coordinator','teacher']::public.organization_role[]))
  )
);
create policy classes_update on public.classes for update to authenticated
using ((select private.is_super_admin()) or (select private.can_manage_class(id)))
with check ((select private.is_super_admin()) or (select private.can_manage_class(id)));

create policy class_members_select on public.class_members for select to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_super_admin())
  or (select private.can_manage_class(class_id))
);
create policy class_members_insert on public.class_members for insert to authenticated
with check (
  added_by = (select auth.uid())
  and ((select private.is_super_admin()) or (select private.can_manage_class(class_id)))
  and exists (
    select 1 from public.classes c
    where c.id = class_id and (select private.is_org_member(c.organization_id))
  )
);
create policy class_members_update on public.class_members for update to authenticated
using ((select private.is_super_admin()) or (select private.can_manage_class(class_id)))
with check ((select private.is_super_admin()) or (select private.can_manage_class(class_id)));
create policy class_members_delete on public.class_members for delete to authenticated
using ((select private.is_super_admin()) or (select private.can_manage_class(class_id)));

create policy class_invites_select on public.class_invites for select to authenticated
using (
  (select private.is_super_admin())
  or (select private.can_manage_class(class_id))
  or invitee_user_id = (select auth.uid())
  or email = (select private.current_email())
);
create policy class_invites_update on public.class_invites for update to authenticated
using ((select private.is_super_admin()) or (select private.can_manage_class(class_id)))
with check ((select private.is_super_admin()) or (select private.can_manage_class(class_id)));

create policy audit_events_select on public.audit_events for select to authenticated
using (
  (select private.is_super_admin())
  or (
    organization_id is not null
    and (select private.has_org_role(organization_id, array['director','coordinator']::public.organization_role[]))
  )
);

create function public.is_super_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$ select private.is_super_admin(); $$;

create function public.create_organization(
  p_name text,
  p_slug text,
  p_kind public.organization_kind default 'school',
  p_logo_url text default null,
  p_primary_color text default '#0B2D6B',
  p_accent_color text default '#F4C430'
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null or not private.is_super_admin() then
    raise exception 'Apenas Super Admin pode criar instituições' using errcode = '42501';
  end if;

  insert into public.organizations (
    name, slug, kind, logo_url, primary_color, accent_color, created_by
  ) values (
    btrim(p_name), lower(btrim(p_slug)), p_kind, nullif(btrim(p_logo_url), ''),
    upper(p_primary_color), upper(p_accent_color), v_user_id
  ) returning id into v_id;

  insert into public.audit_events (organization_id, actor_user_id, action, entity_type, entity_id)
  values (v_id, v_user_id, 'organization.created', 'organization', v_id);
  return v_id;
end;
$$;

create function public.create_organization_invite(
  p_organization_id uuid,
  p_email text,
  p_role public.organization_role,
  p_expires_in interval default interval '7 days'
)
returns table (invite_id uuid, invite_token text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_email text := lower(btrim(p_email));
  v_token text := encode(extensions.gen_random_bytes(32), 'hex');
  v_invite_id uuid;
begin
  if v_user_id is null then raise exception 'Autenticação necessária' using errcode = '42501'; end if;
  if p_expires_in <= interval '0 seconds' or p_expires_in > interval '30 days' then
    raise exception 'Validade do convite deve ficar entre 1 segundo e 30 dias';
  end if;
  if not private.is_super_admin()
     and not private.has_org_role(p_organization_id, array['director']::public.organization_role[]) then
    raise exception 'Sem permissão para convidar colaboradores' using errcode = '42501';
  end if;
  if p_role = 'director' and not private.is_super_admin() then
    raise exception 'Apenas Super Admin pode convidar Diretor' using errcode = '42501';
  end if;
  if p_role = 'student' then
    raise exception 'Use convites de turma para alunos';
  end if;

  update public.organization_invites
  set status = 'revoked', revoked_at = now()
  where organization_id = p_organization_id and lower(email) = v_email and status = 'pending';

  insert into public.organization_invites (
    organization_id, email, role, token_digest, expires_at, created_by
  ) values (
    p_organization_id, v_email, p_role,
    encode(extensions.digest(v_token, 'sha256'), 'hex'), now() + p_expires_in, v_user_id
  ) returning id into v_invite_id;

  insert into public.audit_events (organization_id, actor_user_id, action, entity_type, entity_id, metadata)
  values (p_organization_id, v_user_id, 'organization_invite.created', 'organization_invite', v_invite_id,
    jsonb_build_object('role', p_role, 'email', v_email));
  return query select v_invite_id, v_token;
end;
$$;

create function public.update_organization_branding(
  p_organization_id uuid,
  p_logo_url text,
  p_primary_color text,
  p_accent_color text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null or (
    not private.is_super_admin()
    and not private.has_org_role(p_organization_id, array['director']::public.organization_role[])
  ) then
    raise exception 'Sem permissão para alterar a identidade visual' using errcode = '42501';
  end if;
  update public.organizations
  set logo_url = nullif(btrim(p_logo_url), ''),
      primary_color = upper(p_primary_color),
      accent_color = upper(p_accent_color)
  where id = p_organization_id;
  if not found then raise exception 'Instituição não encontrada'; end if;
  insert into public.audit_events (organization_id, actor_user_id, action, entity_type, entity_id)
  values (p_organization_id, v_user_id, 'organization.branding_updated', 'organization', p_organization_id);
end;
$$;

create function public.revoke_organization_invite(p_invite_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_organization_id uuid;
begin
  select organization_id into v_organization_id
  from public.organization_invites where id = p_invite_id;
  if v_user_id is null or v_organization_id is null or (
    not private.is_super_admin()
    and not private.has_org_role(v_organization_id, array['director']::public.organization_role[])
  ) then
    raise exception 'Sem permissão para revogar o convite' using errcode = '42501';
  end if;
  update public.organization_invites
  set status = 'revoked', revoked_at = now()
  where id = p_invite_id and status = 'pending';
  if not found then raise exception 'Convite pendente não encontrado'; end if;
  insert into public.audit_events (organization_id, actor_user_id, action, entity_type, entity_id)
  values (v_organization_id, v_user_id, 'organization_invite.revoked', 'organization_invite', p_invite_id);
end;
$$;

create function public.respond_organization_invite(p_invite_id uuid, p_accept boolean)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_email text := private.current_email();
  v_invite public.organization_invites%rowtype;
begin
  if v_user_id is null then raise exception 'Autenticação necessária' using errcode = '42501'; end if;
  select * into v_invite from public.organization_invites
  where id = p_invite_id for update;
  if not found or v_invite.email <> v_email then raise exception 'Convite não encontrado' using errcode = '42501'; end if;
  if v_invite.status <> 'pending' then raise exception 'Convite não está pendente'; end if;
  if v_invite.expires_at <= now() then
    update public.organization_invites set status = 'expired' where id = p_invite_id;
    raise exception 'Convite expirado';
  end if;

  if p_accept then
    insert into public.organization_members (organization_id, user_id, role, created_by)
    values (v_invite.organization_id, v_user_id, v_invite.role, v_invite.created_by)
    on conflict (organization_id, user_id) do nothing;
    update public.organization_invites
    set status = 'accepted', used_by = v_user_id, used_at = now()
    where id = p_invite_id;
  else
    update public.organization_invites set status = 'declined' where id = p_invite_id;
  end if;

  insert into public.audit_events (organization_id, actor_user_id, action, entity_type, entity_id)
  values (v_invite.organization_id, v_user_id,
    case when p_accept then 'organization_invite.accepted' else 'organization_invite.declined' end,
    'organization_invite', p_invite_id);
  return v_invite.organization_id;
end;
$$;

create function public.add_institution_student_to_class(p_class_id uuid, p_student_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_organization_id uuid;
begin
  if v_user_id is null or (not private.is_super_admin() and not private.can_manage_class(p_class_id)) then
    raise exception 'Sem permissão para gerenciar a turma' using errcode = '42501';
  end if;
  select organization_id into v_organization_id from public.classes where id = p_class_id;
  if not exists (
    select 1 from public.organization_members
    where organization_id = v_organization_id and user_id = p_student_id and role = 'student'
  ) then
    raise exception 'O usuário não é aluno desta instituição' using errcode = '42501';
  end if;
  insert into public.class_members (class_id, user_id, added_by)
  values (p_class_id, p_student_id, v_user_id)
  on conflict (class_id, user_id) do update set status = 'active', updated_at = now();
  insert into public.audit_events (organization_id, actor_user_id, action, entity_type, entity_id, metadata)
  values (v_organization_id, v_user_id, 'class_member.added', 'class', p_class_id,
    jsonb_build_object('student_id', p_student_id));
end;
$$;

create function public.create_class_invite(
  p_class_id uuid,
  p_identifier text,
  p_expires_in interval default interval '7 days'
)
returns table (invite_id uuid, invite_token text, account_exists boolean)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_identifier text := lower(btrim(p_identifier));
  v_invitee uuid;
  v_email text;
  v_token text := encode(extensions.gen_random_bytes(32), 'hex');
  v_invite_id uuid;
  v_organization_id uuid;
begin
  if v_user_id is null or (not private.is_super_admin() and not private.can_manage_class(p_class_id)) then
    raise exception 'Sem permissão para convidar para a turma' using errcode = '42501';
  end if;
  if p_expires_in <= interval '0 seconds' or p_expires_in > interval '30 days' then
    raise exception 'Validade do convite deve ficar entre 1 segundo e 30 dias';
  end if;
  if left(v_identifier, 1) = '@' then
    v_identifier := substr(v_identifier, 2);
  end if;
  select id, email into v_invitee, v_email from public.profiles
  where lower(email) = v_identifier or lower(username) = v_identifier
  limit 1;
  if v_invitee is null and v_identifier !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    raise exception 'Use o e-mail exato ou username exato';
  end if;
  if v_invitee is null then v_email := v_identifier; end if;
  select organization_id into v_organization_id from public.classes where id = p_class_id;

  update public.class_invites set status = 'revoked', revoked_at = now()
  where class_id = p_class_id and status = 'pending'
    and (invitee_user_id = v_invitee or (v_invitee is null and email = v_email));

  insert into public.class_invites (
    class_id, invitee_user_id, email, token_digest, expires_at, created_by
  ) values (
    p_class_id, v_invitee, v_email, encode(extensions.digest(v_token, 'sha256'), 'hex'),
    now() + p_expires_in, v_user_id
  ) returning id into v_invite_id;
  insert into public.audit_events (organization_id, actor_user_id, action, entity_type, entity_id,
    metadata)
  values (v_organization_id, v_user_id, 'class_invite.created', 'class_invite', v_invite_id,
    jsonb_build_object('account_exists', v_invitee is not null));
  return query select v_invite_id, v_token, v_invitee is not null;
end;
$$;

create function public.respond_class_invite(p_invite_id uuid, p_accept boolean)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_email text := private.current_email();
  v_invite public.class_invites%rowtype;
  v_organization_id uuid;
begin
  if v_user_id is null then raise exception 'Autenticação necessária' using errcode = '42501'; end if;
  select * into v_invite from public.class_invites where id = p_invite_id for update;
  if not found or not (v_invite.invitee_user_id = v_user_id or v_invite.email = v_email) then
    raise exception 'Convite não encontrado' using errcode = '42501';
  end if;
  if v_invite.status <> 'pending' then raise exception 'Convite não está pendente'; end if;
  if v_invite.expires_at <= now() then
    update public.class_invites set status = 'expired' where id = p_invite_id;
    raise exception 'Convite expirado';
  end if;
  select organization_id into v_organization_id from public.classes where id = v_invite.class_id;

  if p_accept then
    insert into public.organization_members (organization_id, user_id, role, created_by)
    values (v_organization_id, v_user_id, 'student', v_invite.created_by)
    on conflict (organization_id, user_id) do nothing;
    insert into public.class_members (class_id, user_id, added_by)
    values (v_invite.class_id, v_user_id, v_invite.created_by)
    on conflict (class_id, user_id) do update set status = 'active', updated_at = now();
    update public.class_invites
    set status = 'accepted', used_by = v_user_id, used_at = now(), invitee_user_id = v_user_id
    where id = p_invite_id;
  else
    update public.class_invites set status = 'declined' where id = p_invite_id;
  end if;
  insert into public.audit_events (organization_id, actor_user_id, action, entity_type, entity_id)
  values (v_organization_id, v_user_id,
    case when p_accept then 'class_invite.accepted' else 'class_invite.declined' end,
    'class_invite', p_invite_id);
  return v_invite.class_id;
end;
$$;

revoke all on function public.is_super_admin() from public, anon;
revoke all on function public.create_organization(text, text, public.organization_kind, text, text, text) from public, anon;
revoke all on function public.create_organization_invite(uuid, text, public.organization_role, interval) from public, anon;
revoke all on function public.update_organization_branding(uuid, text, text, text) from public, anon;
revoke all on function public.revoke_organization_invite(uuid) from public, anon;
revoke all on function public.respond_organization_invite(uuid, boolean) from public, anon;
revoke all on function public.add_institution_student_to_class(uuid, uuid) from public, anon;
revoke all on function public.create_class_invite(uuid, text, interval) from public, anon;
revoke all on function public.respond_class_invite(uuid, boolean) from public, anon;
grant execute on function public.is_super_admin() to authenticated;
grant execute on function public.create_organization(text, text, public.organization_kind, text, text, text) to authenticated;
grant execute on function public.create_organization_invite(uuid, text, public.organization_role, interval) to authenticated;
grant execute on function public.update_organization_branding(uuid, text, text, text) to authenticated;
grant execute on function public.revoke_organization_invite(uuid) to authenticated;
grant execute on function public.respond_organization_invite(uuid, boolean) to authenticated;
grant execute on function public.add_institution_student_to_class(uuid, uuid) to authenticated;
grant execute on function public.create_class_invite(uuid, text, interval) to authenticated;
grant execute on function public.respond_class_invite(uuid, boolean) to authenticated;

revoke all on table public.profiles, public.platform_admins, public.organizations,
  public.organization_members, public.organization_invites, public.classes,
  public.class_members, public.class_invites, public.audit_events
from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (username, full_name, avatar_url) on public.profiles to authenticated;
grant select on public.platform_admins to authenticated;
grant select on public.organizations to authenticated;
grant select on public.organization_members to authenticated;
grant select on public.organization_invites to authenticated;
grant select, insert on public.classes to authenticated;
grant select on public.class_members to authenticated;
grant select on public.class_invites to authenticated;
grant select on public.audit_events to authenticated;
grant usage on schema public to anon, authenticated;

comment on table public.platform_admins is
  'Global platform role. Bootstrap manually with a reviewed user UUID; never derive from user metadata.';
comment on table public.audit_events is
  'Append-only foundation for future commercial audit reporting.';
