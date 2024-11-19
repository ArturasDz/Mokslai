import "./PostImage.css";

export default function PostImage(props) {
  console.log(props);
  return (
    <figure>
      <img src={props.link} alt="Black cat" />
    </figure>
  );
}
