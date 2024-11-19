import Header from "./components/Header";
import PostImage from "./components/PostImage";
import PostContent from "./components/PostContent";
import Box from "./components/Box";

export default function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Header title="Labas, as mokausi" link="src/assets/black-cat.jpg" />
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <PostImage link="src/assets/black-cat.jpg" />
          <PostContent
            title="Post title"
            text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet obcaecati
        nesciunt rem laboriosam? Perferendis quas eaque distinctio tempora,
        iusto illum dolores ullam impedit provident, maxime obcaecati libero
        amet voluptatum eveniet?"
          />
        </div>

        <div className="col-6">
          <PostImage link="src/assets/black-cat.jpg" />
          <PostContent
            title="Post title"
            text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet obcaecati
        nesciunt rem laboriosam? Perferendis quas eaque distinctio tempora,
        iusto illum dolores ullam impedit provident, maxime obcaecati libero
        amet voluptatum eveniet?"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <Box color="bg-primary" />
        </div>
        <div className="col-3">
          <Box color="bg-danger" />
        </div>
        <div className="col-3">
          <Box color="bg-success" />
        </div>
        <div className="col-3">
          <Box color="bg-info" />
        </div>
      </div>
    </div>
  );
}
