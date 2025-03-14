import React from 'react';
import { Product } from './products';

interface CartSidebarProps {
  cart: Product[];
  removeFromCart: (id: number) => void; // Function to handle item removal
}

const CartSidebar: React.FC<CartSidebarProps> = ({ cart, removeFromCart }) => {
  return (
    <div className="cart-sidebar">
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <span>{product.name} - ${product.price}</span>
              <button onClick={() => removeFromCart(product.id)}>Delete</button> {/* Delete button */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartSidebar;

