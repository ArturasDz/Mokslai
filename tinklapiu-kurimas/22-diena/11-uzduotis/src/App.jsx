import Header from "./components/Header";
import CardOne from "./components/CardOne";
import CardTwo from "./components/CardTwo";
import CardThree from "./components/CardThree";
import Info from "./components/Info";
import RecentPosts from "./components/RecentPosts";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <div className="bg-black">
        <Header />
      </div>
      <div>
        <CardOne />
      </div>
      <div>
        <CardTwo />
      </div>
      <div>
        <CardThree />
      </div>
    </div>
  );
}
