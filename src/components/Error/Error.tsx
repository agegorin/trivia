import { observer } from "mobx-react-lite";

import Text from "antd/lib/typography/Text";
import Button from "antd/lib/button";

import "./Error.css";
import { useStore } from "../../store/StoreContext";
import PageLayout from "../PageLayout/PageLayout";

const Error = () => {
  const { triviaStore } = useStore();

  return <PageLayout
    header={"Error happend :("}
    footer={<Button size="large" type="primary" onClick={() => {
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    }}>Reload page</Button>}
  >
    <Text strong>{triviaStore.errorMessage}</Text>
    <Text>Try to reload page to avoid problem</Text>
  </PageLayout>
}

export default observer(Error);
