function WelcomePage() {
  return (
    <div>
      <h1 className="text-9xl text-center pb-6 hover:text-blue-600">Welcome</h1>
      <p className="text-center text-2xl">
        to register please click{" "}
        <a href="/signup" className="text-blue-600">
          here
        </a>
      </p>
    </div>
  );
}

export default WelcomePage;
