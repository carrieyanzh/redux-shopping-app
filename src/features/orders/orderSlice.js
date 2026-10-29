import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    placeOrder: (state, action) => {
      const { customer, items, totalPrice } = action.payload;

      const newOrder = {
        id: `ORD-${Date.now()}`,
        customer,
        items,
        totalPrice,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };

      state.orders.push(newOrder);
    },

    cancelOrder: (state, action) => {
      const order = state.orders.find(
        (item) => item.id === action.payload
      );

      if (order && order.status === "Pending") {
        order.status = "Cancelled";
      }
    },

    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const {
  placeOrder,
  cancelOrder,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;