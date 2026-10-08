-- Avoid the PL/pgSQL output-column variable `user_id` colliding with the
-- table column in ON CONFLICT. Referencing the primary-key constraint is
-- explicit and works for both inserts and updates.

create or replace function private.set_student_streak(
  p_identifier text,
  p_days integer,
  p_anchor_date date default null
)
returns table (
  user_id uuid,
  username text,
  email text,
  streak_days integer,
  anchored_on date
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_identifier text := lower(btrim(p_identifier));
  v_user public.profiles%rowtype;
  v_anchor date := coalesce(
    p_anchor_date,
    (now() at time zone 'America/Sao_Paulo')::date
  );
begin
  if v_identifier = '' then
    raise exception 'Informe o e-mail ou username do usuário';
  end if;

  if p_days is null or p_days < 0 or p_days > 10000 then
    raise exception 'A sequência deve estar entre 0 e 10000 dias';
  end if;

  if left(v_identifier, 1) = '@' then
    v_identifier := substr(v_identifier, 2);
  end if;

  select p.*
  into v_user
  from public.profiles as p
  where lower(p.email) = v_identifier
     or lower(p.username) = v_identifier
  limit 1;

  if v_user.id is null then
    raise exception 'Usuário não encontrado: use o e-mail ou username exato';
  end if;

  insert into public.student_streak_overrides as streak_override (
    user_id,
    streak_days,
    anchored_on,
    updated_at
  )
  values (
    v_user.id,
    p_days,
    v_anchor,
    now()
  )
  on conflict on constraint student_streak_overrides_pkey do update
  set streak_days = excluded.streak_days,
      anchored_on = excluded.anchored_on,
      updated_at = excluded.updated_at;

  return query
  select
    v_user.id,
    v_user.username,
    v_user.email,
    p_days,
    v_anchor;
end;
$$;

revoke all on function private.set_student_streak(text, integer, date)
from public, anon, authenticated;
