import { createClient } from '@supabase/supabase-js'

// Untyped client for RPC calls — supabase-js v2 requires exact Function type shapes
// that are better enforced at the app layer via server actions.
function getClient() {
  const url = process.env['NEXT_PUBLIC_SUPABASE_URL'] ?? ''
  const key = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] ?? ''
  return createClient(url, key)
}

/**
 * Save a news article to the reading list.
 * Creates a reading_item and marks the article as "saved" in news_user_state.
 * Returns the new reading_item id.
 */
export async function saveArticleToReading(userId: string, articleId: string): Promise<string> {
  const { data, error } = await getClient().rpc('save_article_to_reading', {
    p_user_id: userId,
    p_article_id: articleId,
  })
  if (error) throw error
  return data as string
}

/**
 * Seed all Morning Brief sources for a user.
 * Should be called once after first sign-up.
 */
export async function seedMorningBriefSources(userId: string): Promise<void> {
  const { error } = await getClient().rpc('seed_morning_brief_sources', {
    p_user_id: userId,
  })
  if (error) throw error
}
