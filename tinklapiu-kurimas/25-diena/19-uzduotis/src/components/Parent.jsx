import { useState } from "react";
import DisplayCounter from "./DisplayCounter";
import IncrementButton from "./IncrementButton";

export default function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter App</h1>
      <DisplayCounter count={count} />
      <IncrementButton setCounter={setCount} number={count} />
    </div>
  );
}
