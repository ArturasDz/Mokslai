import "./PostContent.css";

export default function PostContent(props) {
  console.log(props);

  return (
    <figcaption>
      <h2>{props.title}</h2>
      <p>{props.text}</p>
    </figcaption>
  );
}
