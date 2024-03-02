'use server';
import md5 from 'md5';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { z } from 'zod';
import { Client } from '@notionhq/client';
import { env } from '../../env';
import { setUser } from './libs/session';
import { Database } from './types/database.types';

const notion = new Client({ auth: env.NOTION_KEY });

const supabase = createServerClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY,
  {
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value;
      },
    },
  }
);

type DatabaseFilterArgs = {
  user: 'Admin' | 'Guest' | 'Guest2';
  status?: string[] | undefined;
};

export const getNotionDatabase = async (filter: DatabaseFilterArgs) => {
  const { user, status } = filter ?? {};

  return await notion.databases.query({
    database_id: env.NOTION_PAGE_ID,
    sorts: [
      {
        property: 'Name',
        direction: 'ascending',
      },
    ],
    filter: {
      and: [
        ...(user === 'Admin'
          ? []
          : [
              {
                property: 'Access',
                multi_select: {
                  contains: user,
                },
              },
            ]),
        {
          or:
            status?.map((s) => ({
              property: 'Status',
              select: {
                equals: s,
              },
            })) ?? [],
        },
      ],
    },
  });
};

export const syncNotionDatabaseToLog = async () => {
  const { results } = await getNotionDatabase({ user: 'Admin' });

  for (const result of results) {
    await supabase.rpc('insert_task_log', {
      p_notion_id: result.id,
      p_data: result,
      p_hash: md5(JSON.stringify(result)),
    });
  }

  return {
    data: 'ok',
  };
};

type LoginArgs = {
  username: string;
  password: string;
};

export const validateAccount = async ({ username, password }: LoginArgs) => {
  if (password !== '1') {
    return null;
  }

  if (username === 'admin') {
    return 'Admin';
  } else if (username === 'guest') {
    return 'Guest';
  } else if (username === 'guest2') {
    return 'Guest2';
  }

  return null;
};

type LoginActionResponse = {
  status: 'ok' | 'error';
  data: {
    user: string | null;
  };
};

export const loginAction = async (
  _: LoginActionResponse | null,
  formData: FormData
) => {
  const args = z
    .object({
      username: z.string().transform((e) => e.toLowerCase()),
      password: z.string(),
    })
    .parse(Object.fromEntries(formData.entries()));

  const user = await validateAccount(args);
  if (user) {
    setUser(user);
  }
  return {
    status: user ? 'ok' : 'error',
    data: { user },
  } satisfies LoginActionResponse;
};

export const getLogAction = async (id: string) => {
  return supabase
    .from('task_log')
    .select('created_at, data')
    .filter('notion_id', 'eq', id)
    .order('created_at', { ascending: false });
};
