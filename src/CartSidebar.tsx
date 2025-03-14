import React from 'react';
import { Product } from './products';

interface CartSidebarProps {
  cart: Product[];
  removeFromCart: (id: number) => void;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ cart, removeFromCart }) => {
  // Group cart items by product ID
  const cartItems: CartItem[] = cart.reduce((items: CartItem[], product) => {
    const existingItem = items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push({ product, quantity: 1 });
    }
    
    return items;
  }, []);
  
  // Calculate total price
  const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="cart-sidebar">
      <h3>Your Cart</h3>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.product.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.product.name}</span>
                  <span className="cart-item-price">${item.product.price.toFixed(2)}</span>
                </div>
                <div className="cart-item-actions">
                  <span className="cart-item-quantity">Qty: {item.quantity}</span>
                  <button 
                    className="remove-from-cart-button"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    -
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;