export default function IncrementButton({ setCounter, number }) {
  //
  return <button onClick={() => setCounter(number + 1)}>Increment</button>;
}
