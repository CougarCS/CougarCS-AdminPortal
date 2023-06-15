export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      contacts: {
        Row: {
          contact_id: string
          discord_snowflake: string | null
          email: string
          first_name: string
          last_name: string | null
          phone_number: number | null
          shirt_size_id: string | null
          timestamp: string | null
          uh_id: number | null
        }
        Insert: {
          contact_id?: string
          discord_snowflake?: string | null
          email: string
          first_name: string
          last_name?: string | null
          phone_number?: number | null
          shirt_size_id?: string | null
          timestamp?: string | null
          uh_id?: number | null
        }
        Update: {
          contact_id?: string
          discord_snowflake?: string | null
          email?: string
          first_name?: string
          last_name?: string | null
          phone_number?: number | null
          shirt_size_id?: string | null
          timestamp?: string | null
          uh_id?: number | null
        }
        Relationships: []
      }
      discord_guilds: {
        Row: {
          admin_role_id: string | null
          guild_id: string
          log_channel_id: string | null
          member_role_id: string | null
          name: string
          officer_role_id: string | null
          report_channel_id: string | null
          tutor_role_id: string | null
          tutoring_director_id: string | null
        }
        Insert: {
          admin_role_id?: string | null
          guild_id: string
          log_channel_id?: string | null
          member_role_id?: string | null
          name: string
          officer_role_id?: string | null
          report_channel_id?: string | null
          tutor_role_id?: string | null
          tutoring_director_id?: string | null
        }
        Update: {
          admin_role_id?: string | null
          guild_id?: string
          log_channel_id?: string | null
          member_role_id?: string | null
          name?: string
          officer_role_id?: string | null
          report_channel_id?: string | null
          tutor_role_id?: string | null
          tutoring_director_id?: string | null
        }
        Relationships: []
      }
      event: {
        Row: {
          date: string
          description: string | null
          duration: number | null
          event_id: string
          point_value: number
          title: string
        }
        Insert: {
          date: string
          description?: string | null
          duration?: number | null
          event_id?: string
          point_value?: number
          title: string
        }
        Update: {
          date?: string
          description?: string | null
          duration?: number | null
          event_id?: string
          point_value?: number
          title?: string
        }
        Relationships: []
      }
      event_attendance: {
        Row: {
          contact_id: string
          event_attendance_id: string
          event_id: string
          swag: boolean
          timestamp: string
        }
        Insert: {
          contact_id: string
          event_attendance_id?: string
          event_id: string
          swag?: boolean
          timestamp?: string
        }
        Update: {
          contact_id?: string
          event_attendance_id?: string
          event_id?: string
          swag?: boolean
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_attendance_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["contact_id"]
          },
          {
            foreignKeyName: "event_attendance_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "event"
            referencedColumns: ["event_id"]
          }
        ]
      }
      member_point_transaction: {
        Row: {
          contact_id: string
          member_point_transaction_id: string
          member_point_transaction_reason_id: string
          point_value: number
          timestamp: string
        }
        Insert: {
          contact_id: string
          member_point_transaction_id?: string
          member_point_transaction_reason_id: string
          point_value: number
          timestamp?: string
        }
        Update: {
          contact_id?: string
          member_point_transaction_id?: string
          member_point_transaction_reason_id?: string
          point_value?: number
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_point_transaction_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["contact_id"]
          },
          {
            foreignKeyName: "member_point_transaction_member_point_transaction_reason_id_fke"
            columns: ["member_point_transaction_reason_id"]
            referencedRelation: "member_point_transaction_reason"
            referencedColumns: ["member_point_transaction_reason_id"]
          }
        ]
      }
      member_point_transaction_reason: {
        Row: {
          member_point_transaction_reason_id: string
          message: string
        }
        Insert: {
          member_point_transaction_reason_id: string
          message: string
        }
        Update: {
          member_point_transaction_reason_id?: string
          message?: string
        }
        Relationships: []
      }
      membership: {
        Row: {
          contact_id: string
          end_date: string
          membership_code_id: string
          membership_id: string
          semesters: number
          start_date: string
        }
        Insert: {
          contact_id: string
          end_date?: string
          membership_code_id: string
          membership_id?: string
          semesters: number
          start_date?: string
        }
        Update: {
          contact_id?: string
          end_date?: string
          membership_code_id?: string
          membership_id?: string
          semesters?: number
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "membership_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["contact_id"]
          },
          {
            foreignKeyName: "membership_membership_code_id_fkey"
            columns: ["membership_code_id"]
            referencedRelation: "membership_code"
            referencedColumns: ["membership_code_id"]
          }
        ]
      }
      membership_code: {
        Row: {
          membership_code_id: string
          message: string
        }
        Insert: {
          membership_code_id: string
          message: string
        }
        Update: {
          membership_code_id?: string
          message?: string
        }
        Relationships: []
      }
      shirt_size: {
        Row: {
          message: string
          shirt_size_id: string
        }
        Insert: {
          message: string
          shirt_size_id: string
        }
        Update: {
          message?: string
          shirt_size_id?: string
        }
        Relationships: []
      }
      tutor_feedback: {
        Row: {
          description: string
          timestamp: string
          tutee: string
          tutor_feedback_id: string
          tutor_id: string
        }
        Insert: {
          description: string
          timestamp?: string
          tutee: string
          tutor_feedback_id: string
          tutor_id: string
        }
        Update: {
          description?: string
          timestamp?: string
          tutee?: string
          tutor_feedback_id?: string
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_feedback_tutor_id_fkey"
            columns: ["tutor_id"]
            referencedRelation: "tutors"
            referencedColumns: ["tutor_id"]
          }
        ]
      }
      tutor_logs: {
        Row: {
          description: string | null
          hours: number
          timestamp: string
          tutor_id: string
          tutor_log_id: string
          tutored_user: string
          tutoring_type_id: string
        }
        Insert: {
          description?: string | null
          hours: number
          timestamp?: string
          tutor_id: string
          tutor_log_id: string
          tutored_user: string
          tutoring_type_id: string
        }
        Update: {
          description?: string | null
          hours?: number
          timestamp?: string
          tutor_id?: string
          tutor_log_id?: string
          tutored_user?: string
          tutoring_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_logs_tutor_id_fkey"
            columns: ["tutor_id"]
            referencedRelation: "tutors"
            referencedColumns: ["tutor_id"]
          },
          {
            foreignKeyName: "tutor_logs_tutoring_type_id_fkey"
            columns: ["tutoring_type_id"]
            referencedRelation: "tutoring_types"
            referencedColumns: ["tutoring_type_id"]
          }
        ]
      }
      tutoring_types: {
        Row: {
          message: string
          tutoring_type_id: string
        }
        Insert: {
          message: string
          tutoring_type_id: string
        }
        Update: {
          message?: string
          tutoring_type_id?: string
        }
        Relationships: []
      }
      tutors: {
        Row: {
          contact_id: string
          end_date: string
          start_date: string
          tutor_id: string
        }
        Insert: {
          contact_id: string
          end_date: string
          start_date?: string
          tutor_id: string
        }
        Update: {
          contact_id?: string
          end_date?: string
          start_date?: string
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutors_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["contact_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      balance: {
        Args: {
          contact_id: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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
