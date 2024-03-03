import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import RootNavigation from "./navigation";
import configureStore from "./redux/store";

const store = configureStore();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <RootNavigation />
    </ReduxProvider>
  )
}

export default App