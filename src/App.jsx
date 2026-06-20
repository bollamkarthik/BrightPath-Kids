import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.location.replace("/prototype/");
  }, []);

  return (
    <main className="redirect-shell">
      <section>
        <p>BrightPath Kids</p>
        <h1>Opening the learning app...</h1>
        <a href="/prototype/">Open BrightPath</a>
      </section>
    </main>
  );
}

export default App;
