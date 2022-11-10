import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Text from "antd/lib/typography/Text";
import Button from "antd/lib/button";
import Input from "antd/lib/input/Input";
import SpinFC from "antd/lib/spin";

import "./Clue.css";
import { cluesForGame } from "../../settings";
import { useStore } from "../../store/StoreContext";
import { TriviaStates } from "../../store/types";
import PageLayout from "../PageLayout/PageLayout";

const Clue = () => {
  const { triviaStore } = useStore();

  const [userInput, setUserInput] = useState("");

  const clue = triviaStore.getCurrentClue();

  useEffect(() => {
    if (clue) setUserInput(clue.answer); // Правильный ответ подставляется для целей тестирования
  }, [clue])

  const getFooter = () => {
    return <>
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
            disabled={userInput.length === 0}
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

  return <PageLayout
    header={`CLUE NUMBER ${triviaStore.currentClue + 1}`}
    footer={getFooter()}
  >
    {triviaStore.loading && <SpinFC />}
    {!triviaStore.loading && clue &&
      <>
        <Text>Value: {clue.value}</Text>
        <Text className="Clue__question">{clue.question}</Text>
        <Text className="Clue__result">
          {triviaStore.state === TriviaStates.CLUE_RIGHT && "You right!"}
          {triviaStore.state === TriviaStates.CLUE_WRONG && `Wrong. Right answer: ${clue.answer}`}
        </Text>
      </>
    }
  </PageLayout>
}

export default observer(Clue);
