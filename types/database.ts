export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      sites: {
        Row: {
          created_at: string
          draft: Json | null
          id: string
          owner_id: string
          published: Json | null
          published_at: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          draft?: Json | null
          id?: string
          owner_id: string
          published?: Json | null
          published_at?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          draft?: Json | null
          id?: string
          owner_id?: string
          published?: Json | null
          published_at?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
