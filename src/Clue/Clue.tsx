import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Button from "antd/lib/button";
import Input from "antd/lib/input/Input";
import SpinFC from "antd/lib/spin";

import "./Clue.css";
import { cluesForGame } from "../settings";
import { useStore } from "../store/StoreContext";
import { TriviaStates } from "../store/types";

const Clue = () => {
  const { triviaStore } = useStore();

  const [userInput, setUserInput] = useState("");

  const clue = triviaStore.getCurrentClue();

  useEffect(() => {
    if (clue) setUserInput(clue.answer); // Правильный ответ подставляется для целей тестирования
  },[clue])

  return <Layout className="Clue">
    <Header className="Clue__header"><Title>CLUE NUMBER {triviaStore.currentClue + 1}</Title></Header>
    <Content className="Clue__content">
      {triviaStore.loading && <SpinFC />}
      {!triviaStore.loading && clue && 
        <>
          <Text>Value: {clue.value}</Text>
          <Text className="Clue__question">{clue.question}</Text>
          <Text className="Clue__result">
            {triviaStore.state === TriviaStates.CLUE_RIGHT && "You right!"}
            {triviaStore.state === TriviaStates.CLUE_WRONG && `Right answer: ${clue.answer}`}
          </Text>
          <Input
            size="large"
            className="Clue__answerInput"
            disabled={triviaStore.state !== TriviaStates.CLUE_ASK}
            status={triviaStore.state === TriviaStates.CLUE_WRONG ? "error" : ""}
            value={userInput}
            onChange={(ev) => setUserInput(ev.currentTarget.value)}
          ></Input>

          {triviaStore.state === TriviaStates.CLUE_ASK &&
            <>
              <Button size="large" type="primary"
                className="Clue__checkButton"
                onClick={() => triviaStore.checkAnswer(userInput)}
              >Check answer</Button>
            </>
          }

          {triviaStore.state !== TriviaStates.CLUE_ASK && triviaStore.currentClue < cluesForGame - 1 &&
            <Button size="large" type="primary"
              className="Clue__checkButton"
              onClick={() => triviaStore.nextClue()}
            >Next clue</Button>
          }

          {triviaStore.state !== TriviaStates.CLUE_ASK && triviaStore.currentClue >= cluesForGame - 1 &&
            <Button size="large" type="primary"
              className="Clue__checkButton"
              onClick={() => triviaStore.nextClue()}
            >See results</Button>
          }

        </>
      }
    </Content>
  </Layout>
}

export default observer(Clue);
