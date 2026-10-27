
import React from "react";
import "./App.css";

function App() {
  const handleGetStarted = () => {
    alert("Welcome to Paradise Nursery! Happy plant shopping.");
  };

  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <h1>Paradise Nursery</h1>
        <h2>Bring Nature Into Your Home</h2>
        <p>
          Discover beautiful indoor plants and make your living
          space greener, fresher, and more peaceful.
        </p>
        <button onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
