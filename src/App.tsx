import React, { useState } from 'react';
import NavigationBar from './Navbar';
import ProductList from './ProductList';
import CartSidebar from './CartSidebar';
import { products as initialProducts } from './products';
import { Product } from './products';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

// Initialize isFavorite to false for all products if it doesn't exist
const productsWithFavorite = initialProducts.map(product => ({
  ...product,
  isFavorite: product.isFavorite || false
}));

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productsWithFavorite);
  const [cart, setCart] = useState<Product[]>([]);

  // Function to add product to cart
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  // Function to remove product from cart
  const removeFromCart = (productId: number) => {
    // Find the index of the first occurrence of the product
    const indexToRemove = cart.findIndex(item => item.id === productId);
    
    // If the product exists in the cart
    if (indexToRemove !== -1) {
      // Create a new array without the item at the found index
      const newCart = [
        ...cart.slice(0, indexToRemove),
        ...cart.slice(indexToRemove + 1)
      ];
      
      setCart(newCart);
    }
  };

  // Function to add a new product
  const addNewProduct = () => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct: Product = {
      id: newId,
      name: "New Product",
      description: "This is a new product description",
      price: 19.99,
      imageUrl: "https://via.placeholder.com/150",
      isFavorite: false // Initialize with false
    };
    
    setProducts([...products, newProduct]);
  };

  // Function to delete a product
  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    
    if (cart.some(product => product.id === id)) {
      removeFromCart(id);
    }
  };

  // NEW FUNCTION: Toggle the favorite status of a product
  const toggleFavorite = (id: number) => {
    setProducts(
      products.map(product => 
        product.id === id 
          ? { ...product, isFavorite: !product.isFavorite } 
          : product
      )
    );
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <ProductList 
          products={products} 
          setProducts={setProducts} 
          addToCart={addToCart}
          addNewProduct={addNewProduct}
          deleteProduct={deleteProduct}
          toggleFavorite={toggleFavorite} // Pass down the new function
        /> 
        <CartSidebar cart={cart} removeFromCart={removeFromCart} /> 
      </div>
    </div>
  );
};

export default App;