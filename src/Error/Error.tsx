import { observer } from "mobx-react-lite";

import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import Button from "antd/lib/button";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";

import "./Error.css";
import { useStore } from "../store/StoreContext";

const Error = () => {
  const { triviaStore } = useStore();

  return <Layout className="Error">
    <Header className="Error__header"><Title>Error happend :(</Title></Header>
    <Content className="Error__content">
      <Text strong>{triviaStore.errorMessage}</Text>
      <Text>Try to reload page to avoid problem</Text>  
    </Content>
    <Footer className="Error__footer">
      <Button size="large" type="primary" onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload()
      }}>Reload page</Button>
    </Footer>
  </Layout>
}

export default observer(Error);
