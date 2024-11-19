import "./Text.css";

export default function Text(props) {
  return (
    <div>
      <p>
        {props.text}
        <a href="#">read more</a>
      </p>
    </div>
  );
}
