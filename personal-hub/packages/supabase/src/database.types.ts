// Auto-generated shape matching supabase/migrations
// Run `pnpm --filter @hub/supabase generate-types` after `supabase start` to regenerate

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; name: string | null; avatar_url: string | null; created_at: string; updated_at: string }
        Insert: { id: string; name?: string | null; avatar_url?: string | null; created_at?: string; updated_at?: string }
        Update: { id?: string; name?: string | null; avatar_url?: string | null; updated_at?: string }
      }
      // --- Finances ---
      transactions: {
        Row: { id: string; user_id: string; title: string; amount: number; type: 'income' | 'expense'; category: string; date: string; notes: string | null; created_at: string; updated_at: string }
        Insert: { id?: string; user_id: string; title: string; amount: number; type: 'income' | 'expense'; category: string; date?: string; notes?: string | null }
        Update: { title?: string; amount?: number; type?: 'income' | 'expense'; category?: string; date?: string; notes?: string | null }
      }
      budgets: {
        Row: { id: string; user_id: string; category: string; limit_amount: number; month: string; created_at: string; updated_at: string }
        Insert: { id?: string; user_id: string; category: string; limit_amount: number; month: string }
        Update: { category?: string; limit_amount?: number; month?: string }
      }
      financial_goals: {
        Row: { id: string; user_id: string; title: string; target_amount: number; current_amount: number; deadline: string | null; completed: boolean; created_at: string; updated_at: string }
        Insert: { id?: string; user_id: string; title: string; target_amount: number; current_amount?: number; deadline?: string | null; completed?: boolean }
        Update: { title?: string; target_amount?: number; current_amount?: number; deadline?: string | null; completed?: boolean }
      }
      // --- Tasks ---
      projects: {
        Row: { id: string; user_id: string; name: string; description: string | null; color: string; archived: boolean; created_at: string; updated_at: string }
        Insert: { id?: string; user_id: string; name: string; description?: string | null; color?: string; archived?: boolean }
        Update: { name?: string; description?: string | null; color?: string; archived?: boolean }
      }
      tasks: {
        Row: { id: string; user_id: string; project_id: string | null; title: string; description: string | null; status: 'todo' | 'in_progress' | 'done' | 'cancelled'; priority: 'low' | 'medium' | 'high' | 'urgent'; due_date: string | null; tags: string[]; completed_at: string | null; created_at: string; updated_at: string }
        Insert: { id?: string; user_id: string; project_id?: string | null; title: string; description?: string | null; status?: 'todo' | 'in_progress' | 'done' | 'cancelled'; priority?: 'low' | 'medium' | 'high' | 'urgent'; due_date?: string | null; tags?: string[] }
        Update: { project_id?: string | null; title?: string; description?: string | null; status?: 'todo' | 'in_progress' | 'done' | 'cancelled'; priority?: 'low' | 'medium' | 'high' | 'urgent'; due_date?: string | null; tags?: string[] }
      }
      // --- Notes ---
      notes: {
        Row: { id: string; user_id: string; title: string; content: string; tags: string[]; pinned: boolean; archived: boolean; created_at: string; updated_at: string }
        Insert: { id?: string; user_id: string; title: string; content?: string; tags?: string[]; pinned?: boolean; archived?: boolean }
        Update: { title?: string; content?: string; tags?: string[]; pinned?: boolean; archived?: boolean }
      }
      saved_links: {
        Row: { id: string; user_id: string; url: string; title: string; description: string | null; favicon: string | null; tags: string[]; read: boolean; created_at: string; updated_at: string }
        Insert: { id?: string; user_id: string; url: string; title: string; description?: string | null; favicon?: string | null; tags?: string[]; read?: boolean }
        Update: { title?: string; description?: string | null; tags?: string[]; read?: boolean }
      }
      // --- News ---
      news_sources: {
        Row: { id: string; user_id: string; name: string; url: string; feed_url: string; category: string; enabled: boolean; favicon: string | null; created_at: string; updated_at: string }
        Insert: { id?: string; user_id: string; name: string; url: string; feed_url: string; category?: string; enabled?: boolean; favicon?: string | null }
        Update: { name?: string; url?: string; feed_url?: string; category?: string; enabled?: boolean; favicon?: string | null }
      }
      news_articles: {
        Row: { id: string; source_id: string; external_id: string | null; title: string; url: string; description: string | null; image_url: string | null; published_at: string; created_at: string }
        Insert: { id?: string; source_id: string; external_id?: string | null; title: string; url: string; description?: string | null; image_url?: string | null; published_at: string }
        Update: { title?: string; description?: string | null; image_url?: string | null }
      }
      news_user_state: {
        Row: { id: string; user_id: string; article_id: string; read: boolean; saved: boolean; created_at: string; updated_at: string }
        Insert: { id?: string; user_id: string; article_id: string; read?: boolean; saved?: boolean }
        Update: { read?: boolean; saved?: boolean }
      }
      // --- Reading ---
      reading_items: {
        Row: { id: string; user_id: string; title: string; author: string | null; url: string | null; type: 'book' | 'article' | 'paper' | 'newsletter' | 'other'; status: 'want_to_read' | 'reading' | 'completed' | 'abandoned'; progress: number; notes: string | null; tags: string[]; rating: number | null; news_article_id: string | null; started_at: string | null; finished_at: string | null; created_at: string; updated_at: string }
        Insert: { id?: string; user_id: string; title: string; author?: string | null; url?: string | null; type?: 'book' | 'article' | 'paper' | 'newsletter' | 'other'; status?: 'want_to_read' | 'reading' | 'completed' | 'abandoned'; progress?: number; notes?: string | null; tags?: string[]; rating?: number | null; news_article_id?: string | null }
        Update: { title?: string; author?: string | null; url?: string | null; type?: 'book' | 'article' | 'paper' | 'newsletter' | 'other'; status?: 'want_to_read' | 'reading' | 'completed' | 'abandoned'; progress?: number; notes?: string | null; tags?: string[]; rating?: number | null; news_article_id?: string | null }
      }
      // --- Professional ---
      skills: {
        Row: { id: string; user_id: string; name: string; category: string; level: number; years_of_experience: number | null; created_at: string; updated_at: string }
        Insert: { id?: string; user_id: string; name: string; category: string; level?: number; years_of_experience?: number | null }
        Update: { name?: string; category?: string; level?: number; years_of_experience?: number | null }
      }
      career_goals: {
        Row: { id: string; user_id: string; title: string; description: string | null; target_date: string | null; completed: boolean; created_at: string; updated_at: string }
        Insert: { id?: string; user_id: string; title: string; description?: string | null; target_date?: string | null; completed?: boolean }
        Update: { title?: string; description?: string | null; target_date?: string | null; completed?: boolean }
      }
      milestones: {
        Row: { id: string; goal_id: string; title: string; completed: boolean; due_date: string | null; created_at: string; updated_at: string }
        Insert: { id?: string; goal_id: string; title: string; completed?: boolean; due_date?: string | null }
        Update: { title?: string; completed?: boolean; due_date?: string | null }
      }
      contacts: {
        Row: { id: string; user_id: string; name: string; role: string | null; company: string | null; email: string | null; linkedin_url: string | null; notes: string | null; tags: string[]; last_contacted_at: string | null; created_at: string; updated_at: string }
        Insert: { id?: string; user_id: string; name: string; role?: string | null; company?: string | null; email?: string | null; linkedin_url?: string | null; notes?: string | null; tags?: string[]; last_contacted_at?: string | null }
        Update: { name?: string; role?: string | null; company?: string | null; email?: string | null; linkedin_url?: string | null; notes?: string | null; tags?: string[]; last_contacted_at?: string | null }
      }
    }
    Views: {
      finances_monthly_summary: {
        Row: { user_id: string | null; month: string | null; total_income: number | null; total_expenses: number | null; balance: number | null }
      }
    }
    Functions: {
      save_article_to_reading: {
        Args: { p_user_id: string; p_article_id: string }
        Returns: string // reading_item id
      }
      seed_morning_brief_sources: {
        Args: { p_user_id: string }
        Returns: void
      }
    }
    Enums: Record<string, never>
  }
}
