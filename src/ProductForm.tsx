import React, { useState, useEffect } from 'react';
import { Product } from './products';
import { Modal, Button, Form } from 'react-bootstrap';

interface ProductFormProps {
  show: boolean;
  handleClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
  editProduct?: Product | null;
}

interface ValidationErrors {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  inventory: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  show, 
  handleClose, 
  onSave, 
  editProduct = null 
}) => {
  // State variables for form inputs
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [inventory, setInventory] = useState('');
  
  // State for validation errors
  const [errors, setErrors] = useState<ValidationErrors>({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    inventory: ''
  });
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If we're editing a product, initialize the form with its values
  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name);
      setPrice(editProduct.price.toString());
      setDescription(editProduct.description);
      setImageUrl(editProduct.imageUrl);
      setInventory(editProduct.inventory ? editProduct.inventory.toString() : '10');
    } else {
      // Reset form when not editing
      setName('');
      setPrice('');
      setDescription('');
      setImageUrl('https://via.placeholder.com/150');
      setInventory('10');
    }
    // Reset errors when form opens
    setErrors({
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      inventory: ''
    });
    setIsSubmitting(false);
  }, [editProduct, show]);

  // Validate the form
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: ValidationErrors = {
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      inventory: ''
    };

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Product name is required';
      isValid = false;
    } else if (name.length < 3) {
      newErrors.name = 'Product name must be at least 3 characters';
      isValid = false;
    }

    // Validate price
    if (!price) {
      newErrors.price = 'Price is required';
      isValid = false;
    } else {
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice) || numericPrice <= 0) {
        newErrors.price = 'Price must be a positive number';
        isValid = false;
      }
    }

    // Validate description
    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else if (description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
      isValid = false;
    }

    // Validate image URL
    if (!imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
      isValid = false;
    } else {
      try {
        new URL(imageUrl);
      } catch (e) {
        newErrors.imageUrl = 'Please enter a valid URL';
        isValid = false;
      }
    }
    
    // Validate inventory
    if (!inventory) {
      newErrors.inventory = 'Inventory is required';
      isValid = false;
    } else {
      const numericInventory = parseInt(inventory);
      if (isNaN(numericInventory) || numericInventory < 0) {
        newErrors.inventory = 'Inventory must be a non-negative number';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      // Convert price and inventory to numbers
      const numericPrice = parseFloat(price);
      const numericInventory = parseInt(inventory);
      
      // Create product object from form data
      const productData = {
        name,
        price: numericPrice,
        description,
        imageUrl,
        inventory: numericInventory,
        isFavorite: editProduct ? editProduct.isFavorite : false
      };
      
      // Call the onSave function with the product data
      onSave(productData);
      
      // Close the modal
      handleClose();
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter product name" 
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              placeholder="Enter price" 
              step="0.01" 
              min="0.01" 
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Enter product description" 
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control 
              type="text" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              placeholder="Enter image URL" 
              isInvalid={!!errors.imageUrl}
            />
            <Form.Control.Feedback type="invalid">
              {errors.imageUrl}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Inventory</Form.Label>
            <Form.Control 
              type="number" 
              value={inventory} 
              onChange={(e) => setInventory(e.target.value)} 
              placeholder="Enter inventory count" 
              min="0" 
              isInvalid={!!errors.inventory}
            />
            <Form.Control.Feedback type="invalid">
              {errors.inventory}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;