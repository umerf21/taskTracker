import { Task } from '../types';

// Simulated API call. In production replace with real endpoints.
export const syncTasksWithServer = async (tasks: Task[]): Promise<Task[]> => {
  // only sync unsynced tasks in this simulation
  const unsynced = tasks.filter(t => !t.synced);
  if (unsynced.length === 0) return tasks;

  // Simulate network delay and server marking tasks synced
  await new Promise((res: any) => setTimeout(res, 800));

  const now = Date.now();
  const updated = tasks.map(t => ({ ...t, synced: true, createdAt: t.createdAt || now }));
  return updated;
};