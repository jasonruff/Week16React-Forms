import React from 'react';
import { Product } from './products';

type ProductCardProps = {
  product: Product;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (product: Product) => void;
  deleteProduct: (id: number) => void;
  toggleFavorite: (id: number) => void;
  onEditProduct: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  setProducts, 
  addToCart,
  deleteProduct,
  toggleFavorite,
  onEditProduct
}) => {
  
  // Helper function to determine inventory status class
  const getInventoryStatus = (inventory: number): string => {
    if (inventory <= 0) return 'out-of-stock';
    if (inventory < 5) return 'low-stock';
    return 'in-stock';
  };
  
  // Helper function to get inventory status label
  const getInventoryLabel = (inventory: number): string => {
    if (inventory <= 0) return 'Out of Stock';
    if (inventory < 5) return 'Low Stock';
    return 'In Stock';
  };

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
      <p className="price">${product.price.toFixed(2)}</p>
      <div className="inventory-status">
        <span className={`inventory-badge ${getInventoryStatus(product.inventory)}`}>
          {getInventoryLabel(product.inventory)}
        </span>
        <span>{product.inventory} in stock</span>
      </div>
      <div className="product-actions">
        <div className="primary-action">
          <button 
            className={`add-to-cart-button ${product.inventory <= 0 ? 'disabled' : ''}`} 
            onClick={() => addToCart(product)}
            disabled={product.inventory <= 0}
            style={{width: '100%'}}
          >
            Add to Cart
          </button>
        </div>
        <div className="secondary-actions">
          <button 
            className="edit-product-button" 
            onClick={() => onEditProduct(product)}
            style={{flex: 1}}
          >
            Edit
          </button>
          <button 
            className="delete-product-button" 
            onClick={() => deleteProduct(product.id)}
            style={{flex: 1}}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;