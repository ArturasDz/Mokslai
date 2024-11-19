import "./Task.css";
import { useState } from "react";

export default function Task() {
  const [title, setTitle] = useState("Task is not done!");
  const [text, setText] = useState("Mark as done");
  const [color, setColor] = useState("btn-danger");
  const cardChange = () => {
    setTitle("Task is Done!");
    setText("Done");
    setColor("btn-success");
  };

  return (
    <div
      className="card position-absolute top-50 start-50 translate-middle"
      style={{ width: 18 + "rem" }}
    >
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a onClick={cardChange} href="#" className={`btn ${color}`}>
          {text}
        </a>
      </div>
    </div>
  );
}
