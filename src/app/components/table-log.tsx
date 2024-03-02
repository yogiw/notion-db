import { getLogAction } from '../actions';
import { Task } from '../types/types';

export const TableLog = async ({ id }: { id: string }) => {
  const data = await getLogAction(id);

  return (
    <table>
      <thead className="bg-slate-100">
        <tr>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>

      <tbody>
        {data.data?.map((item, index) => {
          const task = item.data as unknown as Task;
          return (
            <tr key={index} className="even:bg-green-50">
              <td className="px-4">{task.properties.Status.select.name}</td>
              <td className="px-4">{item.created_at}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
