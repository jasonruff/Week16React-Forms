import React from 'react';
import { Product } from './products';

type ProductCardProps = {
  product: Product;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (product: Product) => void;
  deleteProduct: (id: number) => void;
  toggleFavorite: (id: number) => void; // Add the toggle function
};

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  setProducts, 
  addToCart,
  deleteProduct,
  toggleFavorite // Destructure the new prop
}) => {
  return (
    <div className="product-card">
      <div className="product-header">
        <h3>{product.name}</h3>
        <button 
          className={`favorite-button ${product.isFavorite ? 'favorited' : ''}`}
          onClick={() => toggleFavorite(product.id)}
        >
          {product.isFavorite ? '★' : '☆'}
        </button>
      </div>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <div className="product-actions">
        <button 
          className="add-to-cart-button" 
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        <button 
          className="delete-product-button" 
          onClick={() => deleteProduct(product.id)}
        >
          Delete Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;