-- Favoritos: questões que o aluno marcou para rever depois.
create table public.question_favorites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_id text not null check (char_length(question_id) between 1 and 120),
  created_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

alter table public.question_favorites enable row level security;

create policy question_favorites_select_own on public.question_favorites
for select to authenticated using ((select auth.uid()) = user_id);

create policy question_favorites_insert_own on public.question_favorites
for insert to authenticated with check ((select auth.uid()) = user_id);

create policy question_favorites_delete_own on public.question_favorites
for delete to authenticated using ((select auth.uid()) = user_id);

revoke all on public.question_favorites from anon;
grant select, insert, delete on public.question_favorites to authenticated;

-- Limite de segurança: até 500 favoritas por pessoa.
create or replace function private.question_favorites_limit()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if (select count(*) from public.question_favorites where user_id = new.user_id) >= 500 then
    raise exception 'favorites_limit_reached';
  end if;
  return new;
end;
$$;

create trigger question_favorites_limit
before insert on public.question_favorites
for each row execute function private.question_favorites_limit();
