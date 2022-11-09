import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import Title from "antd/lib/typography/Title";
import Button from "antd/lib/button";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Space from "antd/lib/space";
import SpinFC from "antd/lib/spin";

import "./SelectTheme.css";
import { TriviaTheme } from "../store/types";
import { useStore } from "../store/StoreContext";

interface Props {
  callNextState: () => void
}

const SelectTheme = ({ callNextState }: Props) => {
  const { triviaStore } = useStore();

  useEffect(() => {
    triviaStore.getThemes();
  }, [])

  triviaStore.themes.map((el: TriviaTheme) => {
    console.log(`${el.id} ${el.title}`);
  })

  return <Layout className="SelectTheme">
    <Header className="SelectTheme__header"><Title>Trivia</Title></Header>
    <Content className="SelectTheme__themes">
      {triviaStore.loading && <SpinFC />}
      <Space size="middle" direction="vertical" align="center">
        {triviaStore.themes.map((el: TriviaTheme) =>
          <Button block size="large" key={el.id}
            onClick={() => {
              triviaStore.selectTheme(el.id);
              callNextState();
            }}
          >{el.title}</Button>
        )}
      </Space>
    </Content>
  </Layout>
}

export default observer(SelectTheme);
