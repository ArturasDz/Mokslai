import PostContent from "./PostContent";
import { v4 as uuidv4 } from "uuid";

export default function PostsList() {
  const posts = [
    {
      title: "HTML",
      content: "Lorem ipsum HTML",
      img: "https://picsum.photos/id/123/200/200",
    },
    {
      title: "CSS",
      content: "Lorem ipsum CSS",
      img: "https://picsum.photos/id/237/200/200",
    },
    {
      title: "JavaScript",
      content: "Lorem ipsum JavaScript",
      img: "https://picsum.photos/id/222/200/200",
    },
  ];
  const list = posts.map((post) => {
    return (
      <PostContent
        key={uuidv4()}
        title={post.title}
        content={post.content}
        img={post.img}
      />
    );
  });
  return <div>{list}</div>;
}
