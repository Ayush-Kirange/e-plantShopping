
import React, { useState } from "react";
import "./App.css";
import AboutUs from "./AboutUs";
import ProductList from "./ProductList";

function App() {
  const [showProducts, setShowProducts] = useState(false);

  if (showProducts) {
    return <ProductList />;
  }

  return (
    <div className="background-image">
      <div className="landing-overlay">
        <h1>Welcome to Paradise Nursery</h1>
        <AboutUs />
        <button onClick={() => setShowProducts(true)}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
