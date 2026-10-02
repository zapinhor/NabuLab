create table public.acquisition_daily_metrics (
  metric_date date not null,
  source text not null default '',
  medium text not null default '',
  campaign text not null default '',
  content text not null default '',
  landing_path text not null default '',
  event_type text not null check (event_type in ('landing_request', 'signup_completed', 'premium_viewed', 'checkout_started')),
  event_count bigint not null default 0 check (event_count >= 0),
  primary key (metric_date, source, medium, campaign, content, landing_path, event_type),
  check (char_length(source) <= 40 and char_length(medium) <= 40),
  check (char_length(campaign) <= 100 and char_length(content) <= 100),
  check (char_length(landing_path) <= 120)
);

create index acquisition_daily_metrics_date_event_idx
  on public.acquisition_daily_metrics (metric_date desc, event_type);

alter table public.acquisition_daily_metrics enable row level security;
revoke all on public.acquisition_daily_metrics from public, anon, authenticated;
grant select, insert, update on public.acquisition_daily_metrics to service_role;

create function public.increment_acquisition_daily_metric(
  p_source text,
  p_medium text,
  p_campaign text,
  p_content text,
  p_landing_path text,
  p_event_type text
) returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  insert into public.acquisition_daily_metrics
    (metric_date, source, medium, campaign, content, landing_path, event_type, event_count)
  values
    ((now() at time zone 'America/Sao_Paulo')::date,
     p_source, p_medium, p_campaign, p_content, p_landing_path, p_event_type, 1)
  on conflict (metric_date, source, medium, campaign, content, landing_path, event_type)
  do update set event_count = public.acquisition_daily_metrics.event_count + 1;
end;
$$;

revoke all on function public.increment_acquisition_daily_metric(text,text,text,text,text,text) from public, anon, authenticated;
grant execute on function public.increment_acquisition_daily_metric(text,text,text,text,text,text) to service_role;

comment on table public.acquisition_daily_metrics is
  'Aggregate campaign request and conversion counts only; no visitor identifiers or personal data.';
