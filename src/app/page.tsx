import { getNotionDatabase } from './actions';
import { getUser } from './libs/session';
import { LogoutButton } from './components/logout-button';
import { SyncNotionButon } from './components/sync-notion-button';
import { Table } from './components/table';
import { Task } from './types/types';

export default async function Home() {
  const user = getUser();
  const db = await getNotionDatabase({ user });

  return (
    <main className="bg-slate-100 min-h-screen p-4">
      <div className="contaienr mx-auto overflow-auto p-4 bg-white rounded-lg border border-slate-200">
        <div className="flex gap-2">
          <LogoutButton />
          <SyncNotionButon />
        </div>

        <Table
          tasks={db.results.map((item) => {
            const task = item as unknown as Task;
            return {
              id: item.id,
              name: task.properties.Name.title
                .map((title) => title.text.content)
                .join(' '),
              user: task.properties.Access.multi_select
                .map((item) => item.name)
                .join(','),
              status: task.properties.Status.select.name,
            };
          })}
        />
      </div>
    </main>
  );
}
