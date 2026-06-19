function App() {
  return (
    <main className="webapp-shell">
      <section className="webapp-header">
        <div>
          <p>BrightPath Kids</p>
          <h1>English and Math Practice</h1>
        </div>
        <a href="/prototype/index.html">Open full screen</a>
      </section>

      <section className="prototype-frame" aria-label="Current working prototype">
        <iframe title="BrightPath Kids prototype" src="/prototype/index.html" />
      </section>
    </main>
  );
}

export default App;
