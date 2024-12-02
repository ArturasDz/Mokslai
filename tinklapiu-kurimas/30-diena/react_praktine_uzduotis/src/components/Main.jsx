import Books from "./Books";
import Footer from "./Footer";
import Header from "./Header";

export default function Main() {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <Books />
        </div>
      </main>

      <Footer />
    </>
  );
}
