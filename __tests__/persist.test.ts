import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import taskReducer, { addTask } from '../src/store/taskSlice';
import { Task } from '../src/types';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('Redux Persist Integration', () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  const persistedReducer = persistReducer(persistConfig, taskReducer);

  const createPersistedStore = () =>
    configureStore({
      reducer: persistedReducer,
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

  it('should persist data when tasks are added', async () => {
    const store = createPersistedStore();
    const persistor = persistStore(store);

    const newTask: Task = {
      id: '123',
      name: 'Persisted Task',
      completed: false,
      synced: false,
      createdAt: Date.now(),
    };

    store.dispatch(addTask(newTask));
    await persistor.flush();

    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });
});
