removeItem: (state, action) => {
  state.items = state.items.filter(
    (item) => item.id !== action.payload && item.name !== action.payload
  );
},

updateQuantity: (state, action) => {
  const { id, name, quantity } = action.payload;
  const item = state.items.find(
    (item) =>
      (id !== undefined && item.id === id) ||
      (name !== undefined && item.name === name)
  );

  if (!item) return;

  if (quantity <= 0) {
    state.items = state.items.filter((entry) => entry !== item);
  } else {
    item.quantity = quantity;
  }
},
