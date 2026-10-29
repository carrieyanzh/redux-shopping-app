
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "./cartSlice";

export default function ShoppingCart({onContinueShopping,onCheckout,}) {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = items.length > 0 ? 5 : 0;
  const totalPrice = subtotal + shipping;

  return (
    <main className="cart-layout">
      <section className="cart-items-panel">
        <h1>Shopping Cart</h1>
        <p>{totalQuantity} items</p>

        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="item-details">
                <p>{item.category || "Product"}</p>
                <strong>{item.name}</strong>
              </div>

              <div className="quantity-controls">
                <button
                  onClick={() =>
                    dispatch(decreaseQuantity(item.id))
                  }
                  aria-label={`Decrease ${item.name} quantity`}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    dispatch(increaseQuantity(item.id))
                  }
                  aria-label={`Increase ${item.name} quantity`}
                >
                  +
                </button>
              </div>

              <strong>
                ${(item.price * item.quantity).toFixed(2)}
              </strong>

              <button
                className="remove-button"
                onClick={() => dispatch(removeFromCart(item.id))}
                aria-label={`Remove ${item.name}`}
              >
                ×
              </button>
            </div>
          ))
        )}

        <button
          className="back-button"
          onClick={onContinueShopping}
        >
          ← Back to shop
        </button>
      </section>

      <aside className="cart-summary">
        <h2>Summary</h2>

        <div className="summary-row">
          <span>ITEMS {totalQuantity}</span>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>

        <h4>SHIPPING</h4>
        <p>Standard Delivery — ${shipping.toFixed(2)}</p>

        <hr />

        <div className="summary-row">
          <strong>TOTAL PRICE</strong>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>

        <button
          className="checkout-button"
          disabled={items.length === 0}
          onClick={onCheckout}
        >
          CHECKOUT
        </button>
      </aside>
    </main>
  );
}
