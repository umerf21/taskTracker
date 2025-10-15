import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { addTask, removeTask, updateTask } from '../store/taskSlice';
import { Task } from '../types';
import { useCallback } from 'react';

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);

  const create = useCallback(
    (payload: { name: string; description?: string }) => {
      const now = Date.now();
      const newTask: Task = {
        id: `${now}-${Math.random().toString(36).slice(2, 9)}`,
        name: payload.name.trim(),
        description: payload.description?.trim() || undefined,
        completed: false,
        synced: false,
        createdAt: now,
      };
      dispatch(addTask(newTask));
    },
    [dispatch],
  );

  const toggle = useCallback(
    (id: string) => {
      const task = tasks.find(t => t.id === id);
      if (!task) return;
      dispatch(updateTask({ id, patch: { completed: !task.completed, synced: false } }));
    },
    [tasks, dispatch],
  );

  const remove = useCallback(
    (id: string) => {
      dispatch(removeTask(id));
    },
    [dispatch],
  );

  const remainingCount = tasks.filter(t => !t.completed).length;

  return { tasks, create, toggle, remove, remainingCount };
};
