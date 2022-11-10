import React, { useState } from 'react';
import 'antd/dist/antd.css';

import './App.css';

import Welcome from './Welcome/Welcome';
import SelectTheme from './SelectTheme/SelectTheme';
import Clue from './Clue/Clue';

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
    switch (currentState) {
      case TriviaStates.WELCOME:
        setCurrentState(TriviaStates.SELECTTHEME);
        break;
      case TriviaStates.SELECTTHEME:
        setCurrentState(TriviaStates.CLUE);
        break;
    }
  }

  return (
    <div className="App">
      {currentState === TriviaStates.WELCOME && <Welcome callNextState={callNextState} />}
      {currentState === TriviaStates.SELECTTHEME && <SelectTheme callNextState={callNextState} />}
      {currentState === TriviaStates.CLUE && <Clue callNextState={callNextState} />}
      
    </div>
  );
}

export default App;
