import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "./orderSlice";
import { clearCart } from "../cart/cartSlice";

export default function Checkout() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccessMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (items.length === 0) {
      setSuccessMessage("");
      return;
    }

    dispatch(
      placeOrder({
        customer,
        items: items.map((item) => ({ ...item })),
        totalPrice,
        username: user?.username,
      })
    );

    dispatch(clearCart());

    setCustomer({
      name: "",
      address: "",
      phone: "",
    });

    setSuccessMessage("Order placed successfully!");
  };

  return (
    <div className="order-summary">
      <h2>Checkout</h2>
      <h3>Order Summary</h3>

      {items.length === 0 ? (
        <p>Your shopping cart is empty. Add products before checkout.</p>
      ) : (
        <>
          {items.map((item) => (
            <p key={item.id}>
              {item.name} × {item.quantity} = $
              {(item.price * item.quantity).toFixed(2)}
            </p>
          ))}

          <h3>Total: ${totalPrice.toFixed(2)}</h3>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Customer Name: </label>
              <input
                id="name"
                name="name"
                value={customer.name}
                onChange={handleChange}
                required />
            </div>

            <br />

            <div>
              <label htmlFor="address">Shipping Address: </label>
              <input
                id="address"
                name="address"
                value={customer.address}
                onChange={handleChange}
                required />
            </div>

            <br />

            <div>
              <label htmlFor="phone">Phone Number: </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={customer.phone}
                onChange={handleChange}
                required
              />
            </div>

            <br />

            <button type="submit">Place Order</button>
          </form>
        </>
      )}

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}
