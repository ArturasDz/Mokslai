export default function Child(props) {
  return (
    <ul>
      {props.languages.map((language) => (
        <li>{language}</li>
      ))}
    </ul>
  );
}
