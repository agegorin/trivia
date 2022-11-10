import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import 'antd/dist/antd.css';

import './App.css';
import { TriviaStates } from "./store/types";
import { useStore } from "./store/StoreContext";

import Welcome from './Welcome/Welcome';
import SelectTheme from './SelectTheme/SelectTheme';
import Clue from './Clue/Clue';

function App() {
  const { triviaStore } = useStore();

  const getCurrentElement = () => {
    switch (triviaStore.state) {
      case TriviaStates.WELCOME:
        return <Welcome callNextState={() => triviaStore.startGame()} />
      case TriviaStates.SELECTTHEME:
        return <SelectTheme />
      case TriviaStates.CLUE_ASK:
      case TriviaStates.CLUE_RIGHT:
      case TriviaStates.CLUE_WRONG:
        return <Clue />
      default:
        return "Error happend"
    }
  }

  const getBackgroundColor = () => {
    if (triviaStore.state === TriviaStates.CLUE_RIGHT) return 'rgb(214 255 214)';
    if (triviaStore.state === TriviaStates.CLUE_WRONG) return 'rgb(255 214 214)';
    return 'transparent';
  }

  return (
    <div className="App" style={{backgroundColor: getBackgroundColor()}}>
      {getCurrentElement()}
    </div>
  );
}

export default observer(App);
