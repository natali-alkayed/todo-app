import React from 'react';
import './header.scss';

function Header() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><a href="/">Home</a></li>
        <li className="nav-item"><a href="/settings">settings</a></li>
      </ul>
    </nav>
  );
}

export default Header;


