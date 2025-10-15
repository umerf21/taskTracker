/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import TaskScreen from './screen/TaskScreen/TaskScreen';
import { persistor, store } from './store';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <TaskScreen/>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
    
  );
}


export default App;
