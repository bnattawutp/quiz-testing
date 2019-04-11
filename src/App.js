import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './system/Store.js';
import QuizContainer from './quizGame/containers/QuizContainer.js';
class App extends Component {
  render() {
    return (
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <QuizContainer />
        </Provider>
      </PersistGate>
    );
  }
}

export default App;
