import Title from "antd/lib/typography/Title";
import Button from "antd/lib/button";

import "./Welcome.css";

interface Props {
  callNextState: () => void
}

const Welcome = ({ callNextState }: Props) => {

return <div className="Welcome">
      <Title>Trivia</Title>
      <Button type="primary" size="large" shape="round" onClick={() => callNextState()}>Start</Button>
  </div>
}

export default Welcome;
