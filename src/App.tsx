import React from 'react';
import 'antd/dist/antd.css';

import './App.css';

import Welcome from './Welcome/Welcome';

enum TriviaStates {
  WELCOME,
  SELECTTHEME,
  CLUE,
  RESULTS,
  ERROR
}

function App() {

  let currentState: TriviaStates = TriviaStates.WELCOME;

  return (
    <div className="App">
      {currentState === TriviaStates.WELCOME && <Welcome />}
      
    </div>
  );
}

export default App;
