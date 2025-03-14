import React, { useState } from 'react';
import NavigationBar from './Navbar';
import ProductList from './ProductList';
import CartSidebar from './CartSidebar';
import ProductForm from './ProductForm';
import { Modal, Button } from 'react-bootstrap';
import { products as initialProducts } from './products';
import { Product } from './products';
import { Toast, ToastContainer } from 'react-bootstrap';
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
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  
  // States for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  
  // States for success notifications
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Function to show success message
  const showSuccessMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    // Auto hide after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  // Function to add product to cart
  const addToCart = (product: Product) => {
    // Check if product has inventory available
    if (product.inventory > 0) {
      // Add to cart
      setCart([...cart, product]);
      
      // Decrease the product's inventory
      setProducts(products.map(p => 
        p.id === product.id 
          ? { ...p, inventory: p.inventory - 1 } 
          : p
      ));
      
      // Show success message
      showSuccessMessage(`${product.name} added to cart!`);
    } else {
      alert('Sorry, this product is out of stock!');
    }
  };

  // Function to remove product from cart
  const removeFromCart = (productId: number) => {
    // Find the index of the first occurrence of the product
    const indexToRemove = cart.findIndex(item => item.id === productId);
    
    // If the product exists in the cart
    if (indexToRemove !== -1) {
      const productName = cart[indexToRemove].name;
      
      // Create a new array without the item at the found index
      const newCart = [
        ...cart.slice(0, indexToRemove),
        ...cart.slice(indexToRemove + 1)
      ];
      
      setCart(newCart);
      
      // Increase the product's inventory
      setProducts(products.map(p => 
        p.id === productId 
          ? { ...p, inventory: p.inventory + 1 } 
          : p
      ));
      
      // Show success message
      showSuccessMessage(`${productName} removed from cart!`);
    }
  };

  // Open the form for adding a new product
  const handleAddProduct = () => {
    setEditProduct(null); // Not editing any existing product
    setShowForm(true);
  };

  // Open the form for editing an existing product
  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  // Close the form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditProduct(null);
  };

  // Handle saving a product (new or edited)
  const handleSaveProduct = (productData: Omit<Product, 'id'>) => {
    if (editProduct) {
      // Update existing product
      setProducts(
        products.map(product => 
          product.id === editProduct.id 
            ? { ...product, ...productData } 
            : product
        )
      );
      showSuccessMessage(`${productData.name} has been updated!`);
    } else {
      // Add new product
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      
      const newProduct: Product = {
        id: newId,
        ...productData
      };
      
      setProducts([...products, newProduct]);
      showSuccessMessage(`${productData.name} has been added!`);
    }
  };

  // Function to initiate product deletion (show confirmation)
  const initiateDeleteProduct = (id: number) => {
    setProductToDelete(id);
    setShowDeleteConfirm(true);
  };
  
  // Function to cancel deletion
  const cancelDelete = () => {
    setProductToDelete(null);
    setShowDeleteConfirm(false);
  };

  // Function to confirm and delete a product
  const confirmDeleteProduct = () => {
    if (productToDelete !== null) {
      const productName = products.find(p => p.id === productToDelete)?.name || '';
      
      setProducts(products.filter(product => product.id !== productToDelete));
      
      // Also remove product from cart if it exists there
      if (cart.some(product => product.id === productToDelete)) {
        setCart(cart.filter(product => product.id !== productToDelete));
      }
      
      setShowDeleteConfirm(false);
      setProductToDelete(null);
      
      // Show success message
      showSuccessMessage(`${productName} has been deleted!`);
    }
  };

  // Toggle the favorite status of a product
  const toggleFavorite = (id: number) => {
    const updatedProducts = products.map(product => 
      product.id === id 
        ? { ...product, isFavorite: !product.isFavorite } 
        : product
    );
    
    setProducts(updatedProducts);
    
    const product = updatedProducts.find(p => p.id === id);
    if (product) {
      if (product.isFavorite) {
        showSuccessMessage(`${product.name} added to favorites!`);
      } else {
        showSuccessMessage(`${product.name} removed from favorites!`);
      }
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <ProductList 
          products={products} 
          setProducts={setProducts} 
          addToCart={addToCart}
          addNewProduct={handleAddProduct}
          deleteProduct={initiateDeleteProduct}
          toggleFavorite={toggleFavorite}
          onEditProduct={handleEditProduct}
        /> 
        <CartSidebar cart={cart} removeFromCart={removeFromCart} /> 
      </div>

      {/* Product Form Modal */}
      <ProductForm 
        show={showForm}
        handleClose={handleCloseForm}
        onSave={handleSaveProduct}
        editProduct={editProduct}
      />
      
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Success Toast Notifications */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1060 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)}>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default App;