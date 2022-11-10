import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Button from "antd/lib/button";
import Input from "antd/lib/input/Input";
import SpinFC from "antd/lib/spin";

import "./Clue.css";
import { useStore } from "../store/StoreContext";

enum ClueState {
  ASK,
  RIGHT,
  WRONG
}

interface Props {
  callNextState: () => void
}

const Clue = ({ callNextState }: Props) => {
  const { triviaStore } = useStore();

  const [currentClue, setCurrentClue] = useState(0);
  const [currentState, setCurrentState] = useState(ClueState.ASK);

  useEffect(() => {
    triviaStore.getClues();
  }, [])

  return <Layout className="Clue">
    <Header className="Clue__header"><Title>CLUE NUMBER {currentClue + 1}</Title></Header>
    <Content className="Clue__content">
      {triviaStore.loading && <SpinFC />}
      {!triviaStore.loading && triviaStore.clues.length > 0 && 
        <>
          <Text>Value: {triviaStore.clues[currentClue].value}</Text>
          <Text className="Clue__question">{triviaStore.clues[currentClue].question}</Text>
          <Input size="large" className="Clue__answerInput" defaultValue={triviaStore.clues[currentClue].answer}></Input>
          <Button size="large" type="primary" className="Clue__checkButton">Check answer</Button>
        </>
      }
    </Content>
  </Layout>
}

export default observer(Clue);
