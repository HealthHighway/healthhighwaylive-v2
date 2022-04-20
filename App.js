import React from 'react'
import Routes from './src/navigation/Routes';
import { persistor, store } from './src/store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

class App extends React.Component{

  render(){
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
            <Routes/>
        </PersistGate>
      </Provider>
    )
  }
}

export default App