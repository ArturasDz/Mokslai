import "./Box.css";

export default function Box(props) {
  console.log(props);
  return <div className={`box-size + ${props.color}`}></div>;
}
