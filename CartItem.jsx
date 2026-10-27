
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const parseCost = (cost) => {
    if (typeof cost === "number") return cost;
    return Number(String(cost).replace(/[^0-9.]/g, "")) || 0;
  };

  const calculateTotalAmount = () =>
    cart.reduce(
      (total, item) => total + parseCost(item.cost ?? item.price) * item.quantity,
      0
    );

  const calculateTotalCost = (item) =>
    parseCost(item.cost ?? item.price) * item.quantity;

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="cart-container">
      <nav style={{ padding: 16, background: "#245b3b", color: "white" }}>
        <strong>Paradise Nursery</strong>
        <span style={{ float: "right" }}>
          <a href="/" style={{ color: "white", marginRight: 16 }}>Home</a>
          <a href="/plants" style={{ color: "white", marginRight: 16 }}>Plants</a>
          <a href="/cart" style={{ color: "white" }}>
            Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </a>
        </span>
      </nav>

      <main style={{ padding: 24 }}>
        <h1>Shopping Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty. Add some plants to get started!</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.id ?? item.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: 16,
                  marginBottom: 16,
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  flexWrap: "wrap",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h3>{item.name}</h3>
                  <p>Unit price: ₹{parseCost(item.cost ?? item.price)}</p>
                  <p>Item total: ₹{calculateTotalCost(item)}</p>
                </div>

                <div>
                  <button
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 12px" }}>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <button onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div>
            ))}

            <h2>Total Cart Amount: ₹{calculateTotalAmount()}</h2>
          </>
        )}

        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button onClick={handleContinueShopping}>
            Continue Shopping
          </button>
          <button onClick={() => alert("Coming Soon")}>
            Checkout
          </button>
        </div>
      </main>
    </div>
  );
}

export default CartItem;
