// Navbar.tsx
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar: React.FC = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#002244' }}>
      <Navbar.Brand href="#">E-commerce</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#cart">Cart</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
