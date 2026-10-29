
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login, logout, clearError } from "./features/auth/authSlice";
import ProductList from "./features/cart/ProductList";
import ShoppingCart from "./features/cart/ShoppingCart";
import Checkout from "./features/orders/Checkout";
import OrderHistory from "./features/orders/OrderHistory";

export default function App() {
  const dispatch = useDispatch();

  const { isLoggedIn, user, error } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  const [currentPage, setCurrentPage] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  useEffect(() => {
    if (isLoggedIn) {
      setCurrentPage("shop");
    } else {
      setCurrentPage("login");
    }
  }, [isLoggedIn]);

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(login({username: username.trim(),password,}));
    setPassword("");
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearError());

    setUsername("");
    setPassword("");
  };
  
  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <form className="login-card" onSubmit={handleLogin}>
          <h1>Login</h1>

          <input
            type="text" placeholder="Username" value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />

          <input
            type="password" placeholder="Password"  value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="primary-button">
            Login
          </button>
        </form>
      </div>
    );
  }
  
  return (
    <div className="app-page">
      <header className="app-header">
        <h2>My Shop</h2>

        <div className="header-actions">
          <span>Welcome, {user?.username}</span>

          <button onClick={() => setCurrentPage("shop")}>
            Products
          </button>

          <button onClick={() => setCurrentPage("cart")}>
            🛒 Cart ({cartCount})
          </button>

          <button onClick={() => setCurrentPage("orders")}>
            My Orders
          </button>

          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {currentPage === "shop" && (<ProductList onOpenCart={() => setCurrentPage("cart")} /> )}

      {currentPage === "cart" && (
        <ShoppingCart
          onContinueShopping={() => setCurrentPage("shop")}
          onCheckout={() => setCurrentPage("checkout")}
        />
      )}

      {currentPage === "checkout" && (
        <>
          <button className="back-button" onClick={() => setCurrentPage("cart")}>
            ← Back to Cart
          </button>
          <Checkout />
        </>
      )}

      {currentPage === "orders" && <OrderHistory />}
    </div>
  );
}
