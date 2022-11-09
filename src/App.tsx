import React, { useState } from 'react';
import 'antd/dist/antd.css';

import './App.css';

import Welcome from './Welcome/Welcome';
import SelectTheme from './SelectTheme/SelectTheme';

enum TriviaStates {
  WELCOME,
  SELECTTHEME,
  CLUE,
  RESULTS,
  ERROR
}

function App() {

  let [currentState, setCurrentState] = useState(TriviaStates.WELCOME);
  let [currentClue, setCurrentClue] = useState(0);

  let callNextState = () => {
    if (currentState === TriviaStates.WELCOME) {
      setCurrentState(TriviaStates.SELECTTHEME);
      return;
    }
  }

  return (
    <div className="App">
      {currentState === TriviaStates.WELCOME && <Welcome callNextState={callNextState} />}
      {currentState === TriviaStates.SELECTTHEME && <SelectTheme callNextState={callNextState} />}
      
    </div>
  );
}

export default App;
