import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';

function Header()
{
  return(
    <>
  <header>
      <h2><Link to="/">Home</Link></h2>
      <h2><Link to="/settings">Settings</Link></h2>
    </header>
    </>
  )
}

export default Header;
