import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";

const localurl = "http://localhost:5173"
const products = [
  {
    id: 1,
    name: "Coffee",
    price: 5,
    image: `${localurl}/images/1.jpg?auto=format&fit=crop&w=400&q=80`,
  },
  {
    id: 2,
    name: "Donut",
    price: 3,
    image: `${localurl}/images/2.jpg?auto=format&fit=crop&w=400&q=80`,
  },
  {
    id: 3,
    name: "Bagel",
    price: 4,
    image: `${localurl}/images/3.jpg?auto=format&fit=crop&w=400&q=80`,
  },
];

export default function ProductList({ onOpenCart }) {
  const dispatch = useDispatch();

  return (
    <main className="products-page">
      <div className="section-heading">
        <h1>Products</h1>

        <button onClick={onOpenCart}>
          View Shopping Cart →
        </button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <p>{product.category}</p>
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>

            <button
              className="primary-button"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
