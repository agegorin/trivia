import { observer } from "mobx-react-lite";

import Text from "antd/lib/typography/Text";
import Button from "antd/lib/button";
import { Col, Row } from "antd/lib/grid";


import "./Result.css";
import { useStore } from "../../store/StoreContext";
import PageLayout from "../PageLayout/PageLayout";

const Result = () => {
  const { triviaStore } = useStore();

  const highlightRow = (name: string) => {
    if (name === triviaStore.username) return "Result__list--highlight";
    return "";
  }

  return <PageLayout
    header={"Results"}
    footer={<Button size="large" type="primary" onClick={() => triviaStore.goToStart()}>Start new game</Button>}
  >
      <Text>Yout result is {triviaStore.score}</Text>
      {triviaStore.previousScore !== null && triviaStore.score > triviaStore.previousScore &&
        <Text>Yout previous best result was {triviaStore.previousScore}</Text>
      }
      {triviaStore.previousScore !== null && triviaStore.score < triviaStore.previousScore &&
        <Text>Yout best result is {triviaStore.previousScore}</Text>
      }
      <Text strong className="Result__list-title">All scores:</Text>
      {triviaStore.scores.length > 0 &&
        <div className="Result__list">
          {triviaStore.scores.map(el => {
            return <Row gutter={16} className={highlightRow(el.name)} key={el.name}>
              <Col span="12" className="Result__list-name">{el.name}:</Col>
              <Col span="12">{el.score}</Col>
            </Row>
          })}
        </div>
      }
  </PageLayout>
}

export default observer(Result);
