
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const plantCategories = [
  {
    category: "Indoor Plants",
    plants: [
      { id: 1, name: "Snake Plant", price: 299, image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6" },
      { id: 2, name: "Peace Lily", price: 399, image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5" },
      { id: 3, name: "Monstera", price: 499, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b" },
      { id: 4, name: "Pothos", price: 249, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09" },
      { id: 5, name: "ZZ Plant", price: 349, image: "https://images.unsplash.com/photo-1632207691143-643e2f9a7e2c" },
      { id: 6, name: "Rubber Plant", price: 449, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6" },
    ],
  },
  {
    category: "Succulents",
    plants: [
      { id: 7, name: "Aloe Vera", price: 199, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09" },
      { id: 8, name: "Echeveria", price: 179, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a" },
      { id: 9, name: "Jade Plant", price: 229, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09" },
      { id: 10, name: "Haworthia", price: 189, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a" },
      { id: 11, name: "Burro's Tail", price: 249, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a" },
      { id: 12, name: "String of Pearls", price: 279, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09" },
    ],
  },
  {
    category: "Flowering Plants",
    plants: [
      { id: 13, name: "Orchid", price: 599, image: "https://images.unsplash.com/photo-1566907225472-514a3d5a9b8a" },
      { id: 14, name: "Anthurium", price: 549, image: "https://images.unsplash.com/photo-1597055181300-df1f9d9a8a7b" },
      { id: 15, name: "African Violet", price: 299, image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e" },
      { id: 16, name: "Bromeliad", price: 449, image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e" },
      { id: 17, name: "Kalanchoe", price: 249, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a" },
      { id: 18, name: "Jasmine", price: 329, image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e" },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <nav style={{ padding: "16px", background: "#245b3b", color: "white" }}>
        <strong>Paradise Nursery</strong>
        <span style={{ float: "right" }}>
          <a href="/" style={{ color: "white", marginRight: 16 }}>Home</a>
          <a href="#plants" style={{ color: "white", marginRight: 16 }}>Plants</a>
          <a href="/cart" style={{ color: "white" }}>Cart ({cartCount})</a>
        </span>
      </nav>

      <main id="plants" style={{ padding: 24 }}>
        <h1>Our Plants</h1>
        <p>Choose your favourite plants and bring home a little greenery.</p>

        {plantCategories.map((group) => (
          <section key={group.category}>
            <h2>{group.category}</h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
              marginBottom: 32
            }}>
              {group.plants.map((plant) => {
                const alreadyAdded = cartItems.some((item) => item.id === plant.id);

                return (
                  <article key={plant.id} style={{
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    padding: 16,
                    textAlign: "center"
                  }}>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8 }}
                    />
                    <h3>{plant.name}</h3>
                    <p>₹{plant.price}</p>
                    <button
                      disabled={alreadyAdded}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {alreadyAdded ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
