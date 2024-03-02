import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export type TypedSupabaseClient = SupabaseClient<Database>;

export type Task = {
  properties: TaskProperties;
};

export type TaskProperties = {
  Name: {
    id: string;
    type: string;
    title: {
      href: string | null;
      text: {
        link: string | null;
        content: string;
      };
      type: string;
      plain_text: string;
      annotations: {
        bold: boolean;
        code: boolean;
        color: string;
        italic: boolean;
        underline: boolean;
        strikethrough: boolean;
      };
    }[];
  };
  Access: {
    id: string;
    type: string;
    multi_select: {
      id: string;
      name: string;
      color: string;
    }[];
  };
  Status: {
    id: string;
    type: string;
    select: {
      id: string;
      name: string;
      color: string;
    };
  };
};
