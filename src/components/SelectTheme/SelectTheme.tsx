import { observer } from "mobx-react-lite";

import Button from "antd/lib/button";
import SpinFC from "antd/lib/spin";

import "./SelectTheme.css";
import { TriviaTheme } from "../../store/types";
import { useStore } from "../../store/StoreContext";
import PageLayout from "../PageLayout/PageLayout";

const SelectTheme = () => {
  const { triviaStore } = useStore();

  return <PageLayout
    header={"Select theme"}
    footer={""}
  >
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
  </PageLayout>
}

export default observer(SelectTheme);
