import React from 'react';
import { Product } from './products';
import ProductCard from './ProductCard';

type ProductListProps = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (product: Product) => void;
  addNewProduct: () => void;
  deleteProduct: (id: number) => void;
  toggleFavorite: (id: number) => void; // Add the toggle function
};

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  setProducts, 
  addToCart,
  addNewProduct,
  deleteProduct,
  toggleFavorite // Destructure the new prop
}) => {
  return (
    <div className="product-list">
      <div className="add-product-container">
        <button 
          className="add-product-button" 
          onClick={addNewProduct}
        >
          Add New Product
        </button>
      </div>
      
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          setProducts={setProducts}
          addToCart={addToCart}
          deleteProduct={deleteProduct}
          toggleFavorite={toggleFavorite} // Pass the toggle function to each card
        />
      ))}
    </div>
  );
};

export default ProductList;