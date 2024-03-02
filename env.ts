import { z } from 'zod';

const envObj = {
  NOTION_KEY: z.string(),
  NOTION_PAGE_ID: z.string(),
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
};

export const env = z
  .object(envObj)
  .parse(
    Object.fromEntries(
      Object.keys(envObj).map((key) => [key, process.env[key]])
    ) as Record<string, any>
  );
