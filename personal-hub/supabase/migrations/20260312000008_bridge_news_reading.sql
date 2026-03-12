-- =============================================
-- Bridge: News → Reading List
-- Allows saving a news article directly as a reading item
-- =============================================

-- Add optional reference back to the originating news article
alter table public.reading_items
  add column if not exists news_article_id uuid references public.news_articles(id) on delete set null;

create index reading_items_news_article_id_idx on public.reading_items (news_article_id)
  where news_article_id is not null;

-- Function: save a news article to the reading list
-- Creates a reading_item and marks the article as "saved" in news_user_state
create or replace function public.save_article_to_reading(
  p_user_id uuid,
  p_article_id uuid
)
returns uuid
language plpgsql
security definer
as $$
declare
  v_article record;
  v_reading_item_id uuid;
begin
  -- Fetch article data
  select na.id, na.title, na.url, na.description, ns.name as source_name
  into v_article
  from public.news_articles na
  join public.news_sources ns on ns.id = na.source_id
  where na.id = p_article_id
    and ns.user_id = p_user_id;

  if not found then
    raise exception 'Article not found or access denied';
  end if;

  -- Check if already saved as reading item
  select id into v_reading_item_id
  from public.reading_items
  where user_id = p_user_id and news_article_id = p_article_id;

  if found then
    return v_reading_item_id; -- Already saved, return existing id
  end if;

  -- Create reading item from article
  insert into public.reading_items (
    user_id, title, url, type, status, notes, news_article_id
  ) values (
    p_user_id,
    v_article.title,
    v_article.url,
    'article',
    'want_to_read',
    'Fonte: ' || v_article.source_name,
    p_article_id
  )
  returning id into v_reading_item_id;

  -- Mark article as saved in news_user_state
  insert into public.news_user_state (user_id, article_id, saved)
  values (p_user_id, p_article_id, true)
  on conflict (user_id, article_id)
  do update set saved = true, updated_at = now();

  return v_reading_item_id;
end;
$$;

-- Grant execute to authenticated users
grant execute on function public.save_article_to_reading(uuid, uuid) to authenticated;
