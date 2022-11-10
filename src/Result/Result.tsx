import { observer } from "mobx-react-lite";

import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import Button from "antd/lib/button";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import { Col, Row } from "antd/lib/grid";


import "./Result.css";
import { useStore } from "../store/StoreContext";

const Result = () => {
  const { triviaStore } = useStore();

  const highlightRow = (name: string) => {
    if (name === triviaStore.username) return "Result__list--highlight";
    return "";
  }

  return <Layout className="Result">
    <Header className="Result__header"><Title>Results</Title></Header>
    <Content className="Result__content">
      <Text>Yout result is {triviaStore.score}</Text>
      {triviaStore.previousScore !== null &&
        <Text>Yout previous best result was {triviaStore.previousScore}</Text>
      }
      <Text strong className="Result__list-title">All scores:</Text>
      {triviaStore.scores.length > 0 &&
        <div className="Result__list">
          {triviaStore.scores.map(el => {
            return <Row gutter={16} className={highlightRow(el.name)}>
              <Col span="12" className="Result__list-name">{el.name}:</Col>
              <Col span="12">{el.score}</Col>
            </Row>
          })}
        </div>
      }
    </Content>
    <Footer className="Result__footer">
      <Button size="large" type="primary" onClick={() => triviaStore.goToStart()}>Start new game</Button>
    </Footer>
  </Layout>
}

export default observer(Result);
