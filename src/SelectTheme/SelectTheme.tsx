import { observer } from "mobx-react-lite";

import Title from "antd/lib/typography/Title";
import Button from "antd/lib/button";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import SpinFC from "antd/lib/spin";

import "./SelectTheme.css";
import { TriviaTheme } from "../store/types";
import { useStore } from "../store/StoreContext";

const SelectTheme = () => {
  const { triviaStore } = useStore();

  return <Layout className="SelectTheme">
    <Header className="SelectTheme__header"><Title>Select theme</Title></Header>
    <Content className="SelectTheme__themes">
      {triviaStore.loading && <SpinFC />}
      {triviaStore.themes.map((el: TriviaTheme) =>
        <Button size="large" key={el.id}
          block
          className="SelectTheme__theme"
          onClick={() => {
            triviaStore.selectTheme(el.id);
          }}
        >{el.title}</Button>
      )}
    </Content>
  </Layout>
}

export default observer(SelectTheme);
