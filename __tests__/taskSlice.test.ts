import { configureStore } from '@reduxjs/toolkit';
import taskReducer, { addTask, updateTask, removeTask, setTasks } from '../src/store/taskSlice';
import { Task } from '../src/types';

describe('Task Slice', () => {
  const mockTask = (id: string, name = 'Sample Task'): Task => ({
    id,
    name,
    description: 'Sample description',
    completed: false,
    synced: false,
    createdAt: Date.now(),
  });

  let store: ReturnType<typeof createTestStore>;

  const createTestStore = () =>
    configureStore({
      reducer: {
        tasks: taskReducer,
      },
    });

  beforeEach(() => {
    store = createTestStore();
  });

  it('should initialize with an empty state', () => {
    const state = store.getState().tasks;
    expect(state.tasks).toEqual([]);
  });

  it('should add a new task', () => {
    const task = mockTask('1');
    store.dispatch(addTask(task));
    const state = store.getState().tasks;
    expect(state.tasks.length).toBe(1);
    expect(state.tasks[0].id).toBe('1');
  });

  it('should set multiple tasks at once', () => {
    const tasks = [mockTask('1'), mockTask('2')];
    store.dispatch(setTasks(tasks));
    const state = store.getState().tasks;
    expect(state.tasks.length).toBe(2);
  });

  it('should update an existing task', () => {
    const task = mockTask('1');
    store.dispatch(addTask(task));
    store.dispatch(updateTask({ id: '1', patch: { completed: true } }));
    const state = store.getState().tasks;
    expect(state.tasks[0].completed).toBe(true);
  });

  it('should remove a task by id', () => {
    const t1 = mockTask('1');
    const t2 = mockTask('2');
    store.dispatch(setTasks([t1, t2]));
    store.dispatch(removeTask('1'));
    const state = store.getState().tasks;
    expect(state.tasks.length).toBe(1);
    expect(state.tasks[0].id).toBe('2');
  });

  it('should handle update gracefully when task not found', () => {
    store.dispatch(updateTask({ id: '99', patch: { completed: true } }));
    const state = store.getState().tasks;
    expect(state.tasks.length).toBe(0);
  });
});
