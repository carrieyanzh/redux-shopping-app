import { useDispatch, useSelector } from "react-redux";
import { cancelOrder } from "./orderSlice";

export default function OrderHistory() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.orders);

  return (
    <div>
      <h2>Order History</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
            //   border: "1px solid #cccccc",
              padding: "12px",
              marginBottom: "12px",
            }} >
            <h3>Order ID: {order.id}</h3>

            <p>
              Date: {new Date(order.createdAt).toLocaleString()}
            </p>

            <p>Customer: {order.customer.name}</p>
            <p>Address: {order.customer.address}</p>
            <p>Phone: {order.customer.phone}</p>

            <h4>Items</h4>

            {order.items.map((item) => (
              <p key={item.id}>
                {item.name} × {item.quantity} — $
                {(item.price * item.quantity).toFixed(2)}
              </p>
            ))}

            <h4>Total: ${order.totalPrice.toFixed(2)}</h4>

            <p>Status: {order.status}</p>

            {order.status === "Pending" && (
              <button
                onClick={() => dispatch(cancelOrder(order.id))}
              >
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
