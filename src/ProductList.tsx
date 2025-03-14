import React from 'react';
import { Product } from './products';
import ProductCard from './ProductCard';

type ProductListProps = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (product: Product) => void;
  addNewProduct: () => void;
  deleteProduct: (id: number) => void;
  toggleFavorite: (id: number) => void;
  onEditProduct: (product: Product) => void;
};

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  setProducts, 
  addToCart,
  addNewProduct,
  deleteProduct,
  toggleFavorite,
  onEditProduct
}) => {
  return (
    <div className="product-list">
      <div className="add-product-container">
        <h2>Products ({products.length})</h2>
        <button 
          className="add-product-button" 
          onClick={addNewProduct}
        >
          + Add New Product
        </button>
      </div>
      
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            setProducts={setProducts}
            addToCart={addToCart}
            deleteProduct={deleteProduct}
            toggleFavorite={toggleFavorite}
            onEditProduct={onEditProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;