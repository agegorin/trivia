import Space from "antd/lib/space";
import Title from "antd/lib/typography/Title";
import Button from "antd/lib/button";

import "./Welcome.css";

const Welcome = () => {

  return <div className="Welcome">
      <Title>Trivia</Title>
      <Button type="primary" size="large" shape="round">Start</Button>
  </div>
}

export default Welcome;