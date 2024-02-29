import { getNotionDatabase } from './actions';
import { getUser } from './libs/session';
import { LogoutButton } from './components/logout-button';

export default async function Home() {
  const user = getUser();
  const db = await getNotionDatabase({ user });

  return (
    <main className="bg-slate-100 min-h-screen p-4">
      <div className="contaienr mx-auto overflow-auto p-4 bg-white rounded-lg border border-slate-200">
        <LogoutButton />
        <table className="w-full">
          <tr>
            <th>Project</th>
            <th>User</th>
            <th>Status</th>
          </tr>

          {db.results.map((r) => (
            <tr key={r.id} className="even:bg-green-50">
              <td>
                {/* @ts-ignore */}
                {r.properties.Name.title.map(
                  (title: { text: { content: any } }) => title.text.content
                )}
              </td>
              <td>
                {/* @ts-ignore */}
                {r.properties.Access.multi_select
                  .map((item: { name: any }) => item.name)
                  .join(',')}
              </td>

              {/* @ts-ignore */}
              <td>{r.properties.Status.select.name}</td>
            </tr>
          ))}
        </table>
      </div>
    </main>
  );
}
