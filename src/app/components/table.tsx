'use client';

import { Suspense, useState } from 'react';
import { createPortal } from 'react-dom';
import { TableLog } from './table-log';
import { Modal } from './modal';

type Props = {
  tasks: {
    id: string;
    name: string;
    user: string;
    status: string;
  }[];
};

export const Table = ({ tasks }: Props) => {
  const [logTaskId, setLogTaskId] = useState<string | null>();
  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project</th>
            <th>User</th>
            <th>Status</th>
            <th>Log</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((r) => (
            <tr key={r.id} className="even:bg-green-50">
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.user}</td>
              <td>{r.status}</td>
              <td>
                <button onClick={() => setLogTaskId(r.id)}>View Log</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {logTaskId &&
        createPortal(
          <Modal onClose={() => setLogTaskId(null)}>
            <Suspense
              fallback={
                <div className="p-4">
                  <p>Loading</p>
                </div>
              }
            >
              <TableLog id={logTaskId} />
            </Suspense>
          </Modal>,
          document.body
        )}
    </>
  );
};
