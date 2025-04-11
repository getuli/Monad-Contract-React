import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '1rem', background: '#eee' }}>
    <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
    <Link to="/interact" style={{ marginRight: '1rem' }}>Interact</Link>
    <Link to="/about" style={{ marginRight: '1rem' }}>About</Link>
    <Link to="/transfer" style={{ marginRight: '1rem' }}>Transfer</Link>
    <Link to="/transfertoken">Transferir Tokens</Link>
  </nav>
);

export default Navbar;
