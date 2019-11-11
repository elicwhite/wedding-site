import { Link } from 'gatsby';
import React from 'react';

const NavBar = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/rsvp">RSVP</Link>
    <Link to="/gallery">Gallery</Link>
    <Link to="/login">Login</Link>
  </div>
);

export default NavBar;
