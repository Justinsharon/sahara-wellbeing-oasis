export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      assessment_responses: {
        Row: {
          answer_data: Json | null
          answer_value: string
          created_at: string
          emotional_score: number | null
          id: string
          lifestyle_score: number | null
          physical_score: number | null
          question_id: string
          session_id: string
          work_score: number | null
        }
        Insert: {
          answer_data?: Json | null
          answer_value: string
          created_at?: string
          emotional_score?: number | null
          id?: string
          lifestyle_score?: number | null
          physical_score?: number | null
          question_id: string
          session_id: string
          work_score?: number | null
        }
        Update: {
          answer_data?: Json | null
          answer_value?: string
          created_at?: string
          emotional_score?: number | null
          id?: string
          lifestyle_score?: number | null
          physical_score?: number | null
          question_id?: string
          session_id?: string
          work_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assessment_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_sessions: {
        Row: {
          completed_at: string | null
          created_at: string
          current_question_id: string | null
          emotional_score: number | null
          id: string
          lifestyle_score: number | null
          physical_score: number | null
          started_at: string
          status: string
          updated_at: string
          user_id: string
          work_score: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_question_id?: string | null
          emotional_score?: number | null
          id?: string
          lifestyle_score?: number | null
          physical_score?: number | null
          started_at?: string
          status?: string
          updated_at?: string
          user_id: string
          work_score?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_question_id?: string | null
          emotional_score?: number | null
          id?: string
          lifestyle_score?: number | null
          physical_score?: number | null
          started_at?: string
          status?: string
          updated_at?: string
          user_id?: string
          work_score?: number | null
        }
        Relationships: []
      }
      badges: {
        Row: {
          created_at: string
          criteria_json: Json
          description: string
          icon: string
          id: string
          key: string
          name: string
        }
        Insert: {
          created_at?: string
          criteria_json: Json
          description: string
          icon: string
          id?: string
          key: string
          name: string
        }
        Update: {
          created_at?: string
          criteria_json?: Json
          description?: string
          icon?: string
          id?: string
          key?: string
          name?: string
        }
        Relationships: []
      }
      challenge_checkins: {
        Row: {
          activity_type: string
          challenge_id: string
          duration_min: number | null
          id: string
          timestamp: string
          user_id: string
        }
        Insert: {
          activity_type: string
          challenge_id: string
          duration_min?: number | null
          id?: string
          timestamp?: string
          user_id: string
        }
        Update: {
          activity_type?: string
          challenge_id?: string
          duration_min?: number | null
          id?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_checkins_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_checkins_challenge_id_user_id_fkey"
            columns: ["challenge_id", "user_id"]
            isOneToOne: false
            referencedRelation: "challenge_participants"
            referencedColumns: ["challenge_id", "user_id"]
          },
        ]
      }
      challenge_participants: {
        Row: {
          alias: string
          challenge_id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          alias: string
          challenge_id: string
          joined_at?: string
          user_id: string
        }
        Update: {
          alias?: string
          challenge_id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_participants_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          created_at: string
          created_by: string | null
          days: number
          description: string
          end_date: string
          id: string
          is_public: boolean
          join_code: string
          start_date: string
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          days: number
          description: string
          end_date: string
          id?: string
          is_public?: boolean
          join_code: string
          start_date: string
          title: string
          type: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          days?: number
          description?: string
          end_date?: string
          id?: string
          is_public?: boolean
          join_code?: string
          start_date?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      counselor_notes: {
        Row: {
          content: string
          counselor_id: string
          created_at: string
          id: string
          interventions_used: string[] | null
          is_confidential: boolean
          metadata: Json | null
          note_type: string
          risk_level: number | null
          session_id: string
          updated_at: string
        }
        Insert: {
          content: string
          counselor_id: string
          created_at?: string
          id?: string
          interventions_used?: string[] | null
          is_confidential?: boolean
          metadata?: Json | null
          note_type?: string
          risk_level?: number | null
          session_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          counselor_id?: string
          created_at?: string
          id?: string
          interventions_used?: string[] | null
          is_confidential?: boolean
          metadata?: Json | null
          note_type?: string
          risk_level?: number | null
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "counselor_notes_counselor_id_fkey"
            columns: ["counselor_id"]
            isOneToOne: false
            referencedRelation: "crisis_counselors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "counselor_notes_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "crisis_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      crisis_counselors: {
        Row: {
          availability_status: string
          certification_level: string
          created_at: string
          current_sessions: number
          id: string
          languages: string[]
          max_concurrent_sessions: number
          specialties: string[]
          timezone: string
          updated_at: string
          user_id: string
        }
        Insert: {
          availability_status?: string
          certification_level?: string
          created_at?: string
          current_sessions?: number
          id?: string
          languages?: string[]
          max_concurrent_sessions?: number
          specialties?: string[]
          timezone?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          availability_status?: string
          certification_level?: string
          created_at?: string
          current_sessions?: number
          id?: string
          languages?: string[]
          max_concurrent_sessions?: number
          specialties?: string[]
          timezone?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      crisis_escalations: {
        Row: {
          action_taken: string | null
          created_at: string
          escalated_by: string
          escalated_to: string | null
          escalation_type: string
          id: string
          metadata: Json | null
          outcome: string | null
          reason: string
          resolved_at: string | null
          session_id: string
        }
        Insert: {
          action_taken?: string | null
          created_at?: string
          escalated_by: string
          escalated_to?: string | null
          escalation_type: string
          id?: string
          metadata?: Json | null
          outcome?: string | null
          reason: string
          resolved_at?: string | null
          session_id: string
        }
        Update: {
          action_taken?: string | null
          created_at?: string
          escalated_by?: string
          escalated_to?: string | null
          escalation_type?: string
          id?: string
          metadata?: Json | null
          outcome?: string | null
          reason?: string
          resolved_at?: string | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crisis_escalations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "crisis_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      crisis_locations: {
        Row: {
          address: string | null
          city: string | null
          coordinates: unknown | null
          country_code: string
          created_at: string
          hours_of_operation: string | null
          id: string
          is_active: boolean
          languages_supported: string[] | null
          metadata: Json | null
          name: string
          phone_number: string | null
          resource_type: string
          special_services: string[] | null
          state_province: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          coordinates?: unknown | null
          country_code: string
          created_at?: string
          hours_of_operation?: string | null
          id?: string
          is_active?: boolean
          languages_supported?: string[] | null
          metadata?: Json | null
          name: string
          phone_number?: string | null
          resource_type: string
          special_services?: string[] | null
          state_province?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          coordinates?: unknown | null
          country_code?: string
          created_at?: string
          hours_of_operation?: string | null
          id?: string
          is_active?: boolean
          languages_supported?: string[] | null
          metadata?: Json | null
          name?: string
          phone_number?: string | null
          resource_type?: string
          special_services?: string[] | null
          state_province?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      crisis_messages: {
        Row: {
          content: string
          created_at: string
          file_url: string | null
          id: string
          is_read: boolean
          message_type: string
          metadata: Json | null
          sender_id: string
          sender_type: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          file_url?: string | null
          id?: string
          is_read?: boolean
          message_type?: string
          metadata?: Json | null
          sender_id: string
          sender_type: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          file_url?: string | null
          id?: string
          is_read?: boolean
          message_type?: string
          metadata?: Json | null
          sender_id?: string
          sender_type?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crisis_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "crisis_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      crisis_sessions: {
        Row: {
          counselor_id: string | null
          created_at: string
          ended_at: string | null
          escalation_reason: string | null
          id: string
          initial_message: string | null
          location_data: Json | null
          resolution_notes: string | null
          session_metadata: Json | null
          session_type: string
          started_at: string | null
          status: string
          updated_at: string
          urgency_level: number
          user_id: string
        }
        Insert: {
          counselor_id?: string | null
          created_at?: string
          ended_at?: string | null
          escalation_reason?: string | null
          id?: string
          initial_message?: string | null
          location_data?: Json | null
          resolution_notes?: string | null
          session_metadata?: Json | null
          session_type?: string
          started_at?: string | null
          status?: string
          updated_at?: string
          urgency_level?: number
          user_id: string
        }
        Update: {
          counselor_id?: string | null
          created_at?: string
          ended_at?: string | null
          escalation_reason?: string | null
          id?: string
          initial_message?: string | null
          location_data?: Json | null
          resolution_notes?: string | null
          session_metadata?: Json | null
          session_type?: string
          started_at?: string | null
          status?: string
          updated_at?: string
          urgency_level?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crisis_sessions_counselor_id_fkey"
            columns: ["counselor_id"]
            isOneToOne: false
            referencedRelation: "crisis_counselors"
            referencedColumns: ["id"]
          },
        ]
      }
      mood_entries: {
        Row: {
          created_at: string
          date: string
          entry_type: string | null
          hours_slept: number | null
          id: string
          mood: string
          notes: string | null
          sleep_quality: string | null
          stress_level: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          entry_type?: string | null
          hours_slept?: number | null
          id?: string
          mood: string
          notes?: string | null
          sleep_quality?: string | null
          stress_level?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          entry_type?: string | null
          hours_slept?: number | null
          id?: string
          mood?: string
          notes?: string | null
          sleep_quality?: string | null
          stress_level?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      nudges: {
        Row: {
          created_at: string
          delivered_at: string | null
          id: string
          message: string
          metadata_json: Json | null
          scheduled_at: string
          severity: string | null
          status: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          delivered_at?: string | null
          id?: string
          message: string
          metadata_json?: Json | null
          scheduled_at?: string
          severity?: string | null
          status?: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          delivered_at?: string | null
          id?: string
          message?: string
          metadata_json?: Json | null
          scheduled_at?: string
          severity?: string | null
          status?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          assessment_session_id: string | null
          character_companion: string | null
          country_code: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          email_verified: boolean | null
          full_name: string | null
          gender: string | null
          id: string
          mobile_number: string | null
          onboarding_completed: boolean | null
          otp_verified: boolean | null
          updated_at: string
        }
        Insert: {
          assessment_session_id?: string | null
          character_companion?: string | null
          country_code?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          email_verified?: boolean | null
          full_name?: string | null
          gender?: string | null
          id: string
          mobile_number?: string | null
          onboarding_completed?: boolean | null
          otp_verified?: boolean | null
          updated_at?: string
        }
        Update: {
          assessment_session_id?: string | null
          character_companion?: string | null
          country_code?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          email_verified?: boolean | null
          full_name?: string | null
          gender?: string | null
          id?: string
          mobile_number?: string | null
          onboarding_completed?: boolean | null
          otp_verified?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_assessment_session_id_fkey"
            columns: ["assessment_session_id"]
            isOneToOne: false
            referencedRelation: "assessment_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      progress_snapshots: {
        Row: {
          avg_sleep: number | null
          avg_stress: number | null
          created_at: string
          date: string
          id: string
          mood_distribution_json: Json | null
          user_id: string
        }
        Insert: {
          avg_sleep?: number | null
          avg_stress?: number | null
          created_at?: string
          date: string
          id?: string
          mood_distribution_json?: Json | null
          user_id: string
        }
        Update: {
          avg_sleep?: number | null
          avg_stress?: number | null
          created_at?: string
          date?: string
          id?: string
          mood_distribution_json?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      therapy_recommendations: {
        Row: {
          confidence_score: number
          created_at: string
          id: string
          priority: number | null
          reasoning: string | null
          recommendation_type: string
          session_id: string
          user_id: string
        }
        Insert: {
          confidence_score: number
          created_at?: string
          id?: string
          priority?: number | null
          reasoning?: string | null
          recommendation_type: string
          session_id: string
          user_id: string
        }
        Update: {
          confidence_score?: number
          created_at?: string
          id?: string
          priority?: number | null
          reasoning?: string | null
          recommendation_type?: string
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapy_recommendations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assessment_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          avg_sleep_7d: number | null
          avg_stress_7d: number | null
          current_streak: number
          last_checkin_date: string | null
          longest_streak: number
          mood_entries_7d: number
          updated_at: string
          user_id: string
        }
        Insert: {
          avg_sleep_7d?: number | null
          avg_stress_7d?: number | null
          current_streak?: number
          last_checkin_date?: string | null
          longest_streak?: number
          mood_entries_7d?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          avg_sleep_7d?: number | null
          avg_stress_7d?: number | null
          current_streak?: number
          last_checkin_date?: string | null
          longest_streak?: number
          mood_entries_7d?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_user_stats: {
        Args: { target_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
