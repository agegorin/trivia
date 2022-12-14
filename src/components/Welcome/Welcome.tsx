import { useState } from "react";

import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import Input from "antd/lib/input";
import Button from "antd/lib/button";

import "./Welcome.css";

interface Props {
  defaultUsername: string,
  callNextState: (username: string) => void
}

const Welcome = ({ defaultUsername, callNextState }: Props) => {

  const [username, setUsername] = useState(defaultUsername);
  
  return <div className="Welcome">
    <Title>Trivia</Title>
    <Text className="Welcome__text">Input your name:</Text>
    <Input size="large" value={username}
      className="Welcome__username"
      onChange={(ev) => setUsername(ev.currentTarget.value)}
      onPressEnter={() => callNextState(username)}
    ></Input>
    <Button type="primary" size="large" shape="round"
      disabled={username.length === 0}
      onClick={() => callNextState(username)}
    >Start</Button>
  </div>
}

export default Welcome;
