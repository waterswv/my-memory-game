import React from 'react';
import './NavBar.css';


const NavBar = ({onNewGame}) => (
  <header>
    <h2><a>Memory Game</a></h2>
    <nav>
      <li><a onClick={onNewGame}>New Game</a></li>
    </nav>
  </header>
);

export default NavBar;
