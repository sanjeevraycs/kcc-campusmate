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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          course_id: string | null
          created_at: string
          date: string
          id: string
          notes: string | null
          status: string
          user_id: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          date: string
          id?: string
          notes?: string | null
          status: string
          user_id: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      cab_sharing: {
        Row: {
          cost_per_person: number | null
          created_at: string
          departure_time: string
          destination: string
          id: string
          ride_type: string
          seats_available: number | null
          status: string | null
          user_id: string
        }
        Insert: {
          cost_per_person?: number | null
          created_at?: string
          departure_time: string
          destination: string
          id?: string
          ride_type: string
          seats_available?: number | null
          status?: string | null
          user_id: string
        }
        Update: {
          cost_per_person?: number | null
          created_at?: string
          departure_time?: string
          destination?: string
          id?: string
          ride_type?: string
          seats_available?: number | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      candidates: {
        Row: {
          created_at: string
          election_id: string | null
          id: string
          manifesto: string | null
          photo_url: string | null
          position: string
          user_id: string
        }
        Insert: {
          created_at?: string
          election_id?: string | null
          id?: string
          manifesto?: string | null
          photo_url?: string | null
          position: string
          user_id: string
        }
        Update: {
          created_at?: string
          election_id?: string | null
          id?: string
          manifesto?: string | null
          photo_url?: string | null
          position?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidates_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          room_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          room_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_room_members: {
        Row: {
          id: string
          joined_at: string
          room_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          room_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_room_members_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          related_id: string | null
          room_type: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          related_id?: string | null
          room_type: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          related_id?: string | null
          room_type?: string
        }
        Relationships: []
      }
      complaints: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          images: string[] | null
          is_anonymous: boolean | null
          priority: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          images?: string[] | null
          is_anonymous?: boolean | null
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          images?: string[] | null
          is_anonymous?: boolean | null
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          course_code: string
          course_name: string
          created_at: string
          credits: number | null
          id: string
          professor: string | null
          semester: string | null
        }
        Insert: {
          course_code: string
          course_name: string
          created_at?: string
          credits?: number | null
          id?: string
          professor?: string | null
          semester?: string | null
        }
        Update: {
          course_code?: string
          course_name?: string
          created_at?: string
          credits?: number | null
          id?: string
          professor?: string | null
          semester?: string | null
        }
        Relationships: []
      }
      elections: {
        Row: {
          created_at: string
          description: string | null
          end_date: string
          id: string
          start_date: string
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date: string
          id?: string
          start_date: string
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string
          id?: string
          start_date?: string
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          created_at: string
          event_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          category: string
          created_at: string
          description: string
          end_time: string
          id: string
          image_url: string | null
          location: string | null
          max_participants: number | null
          organizer_id: string
          registration_required: boolean | null
          start_time: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          end_time: string
          id?: string
          image_url?: string | null
          location?: string | null
          max_participants?: number | null
          organizer_id: string
          registration_required?: boolean | null
          start_time: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          end_time?: string
          id?: string
          image_url?: string | null
          location?: string | null
          max_participants?: number | null
          organizer_id?: string
          registration_required?: boolean | null
          start_time?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      gate_logs: {
        Row: {
          created_at: string
          entry_type: string
          id: string
          location: string | null
          timestamp: string
          user_id: string
        }
        Insert: {
          created_at?: string
          entry_type: string
          id?: string
          location?: string | null
          timestamp?: string
          user_id: string
        }
        Update: {
          created_at?: string
          entry_type?: string
          id?: string
          location?: string | null
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      lost_found: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          images: string[] | null
          item_type: string
          location: string | null
          status: string | null
          title: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          images?: string[] | null
          item_type: string
          location?: string | null
          status?: string | null
          title: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          images?: string[] | null
          item_type?: string
          location?: string | null
          status?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      marketplace: {
        Row: {
          category: string
          condition: string | null
          created_at: string
          description: string
          id: string
          images: string[] | null
          price: number
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          condition?: string | null
          created_at?: string
          description: string
          id?: string
          images?: string[] | null
          price: number
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          condition?: string | null
          created_at?: string
          description?: string
          id?: string
          images?: string[] | null
          price?: number
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notices: {
        Row: {
          author_id: string
          category: string
          content: string
          created_at: string
          id: string
          is_pinned: boolean | null
          priority: string | null
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          category: string
          content: string
          created_at?: string
          id?: string
          is_pinned?: boolean | null
          priority?: string | null
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category?: string
          content?: string
          created_at?: string
          id?: string
          is_pinned?: boolean | null
          priority?: string | null
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          course: string | null
          created_at: string
          department: string | null
          full_name: string
          id: string
          phone_number: string
          roll_number: string
          updated_at: string
          user_id: string
          year: number | null
        }
        Insert: {
          avatar_url?: string | null
          course?: string | null
          created_at?: string
          department?: string | null
          full_name: string
          id?: string
          phone_number: string
          roll_number: string
          updated_at?: string
          user_id: string
          year?: number | null
        }
        Update: {
          avatar_url?: string | null
          course?: string | null
          created_at?: string
          department?: string | null
          full_name?: string
          id?: string
          phone_number?: string
          roll_number?: string
          updated_at?: string
          user_id?: string
          year?: number | null
        }
        Relationships: []
      }
      timetable: {
        Row: {
          course_id: string | null
          created_at: string
          day_of_week: string
          end_time: string
          id: string
          room_number: string | null
          start_time: string
          user_id: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          day_of_week: string
          end_time: string
          id?: string
          room_number?: string | null
          start_time: string
          user_id: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          day_of_week?: string
          end_time?: string
          id?: string
          room_number?: string | null
          start_time?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "timetable_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          candidate_id: string | null
          created_at: string
          election_id: string | null
          id: string
          user_id: string
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string
          election_id?: string | null
          id?: string
          user_id: string
        }
        Update: {
          candidate_id?: string | null
          created_at?: string
          election_id?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "student"
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
    Enums: {
      app_role: ["admin", "student"],
    },
  },
} as const
