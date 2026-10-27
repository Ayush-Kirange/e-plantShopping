
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div>
      <nav style={{ padding: 16, background: "#245b3b", color: "white" }}>
        <strong>Paradise Nursery</strong>
        <span style={{ float: "right" }}>
          <a href="/" style={{ color: "white", marginRight: 16 }}>Home</a>
          <a href="/plants" style={{ color: "white", marginRight: 16 }}>Plants</a>
          <a href="/cart" style={{ color: "white" }}>Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</a>
        </span>
      </nav>

      <main style={{ padding: 24 }}>
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty. Continue shopping to find your favourite plants!</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
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
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />

                <div style={{ flex: 1 }}>
                  <h3>{item.name}</h3>
                  <p>Unit price: ₹{item.price}</p>
                  <p>Item total: ₹{item.price * item.quantity}</p>
                </div>

                <div>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>

                  <span style={{ margin: "0 12px" }}>{item.quantity}</span>

                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <button onClick={() => dispatch(removeItem(item.id))}>
                  Delete
                </button>
              </div>
            ))}

            <h2>Total: ₹{totalAmount}</h2>

            <button onClick={() => alert("Coming Soon")}>
              Checkout
            </button>
          </>
        )}

        <p>
          <a href="/plants">Continue Shopping</a>
        </p>
      </main>
    </div>
  );
}

export default CartItem;
