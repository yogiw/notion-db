'use client';

import { syncNotionDatabaseToLog } from '../actions';

export const SyncNotionButon = () => {
  const handleSync = () => {
    syncNotionDatabaseToLog();
  };

  return (
    <button
      className="rounded-full bg-green-300 text-green-800 py-2  px-4 font-medium"
      onClick={handleSync}
    >
      Sync
    </button>
  );
};
