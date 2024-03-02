import React from 'react';

function NavBar({ handleNavClick }) {
  const handleClick = (sectionId) => {
    handleNavClick(sectionId);
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <a onClick={() => handleClick("home")} href="#home">Home</a>
        </li>
        <li>
          <a onClick={() => handleClick("about")} href="#about">About</a>
        </li>
        <li>
          <a onClick={() => handleClick("prevention")} href="#prevention">Predict</a>
        </li>
        <li>
          <a onClick={() => handleClick("breastcancerinfo")} href="#breastcancerinfo">About Cancer</a>
        </li>
        <li>
          <a onClick={() => handleClick("support")} href="#support">Dr Channelling</a>
        </li>
        <li>
          <a onClick={() => handleClick("resources")} href="#resources">Health Journal</a>
        </li>
        <li>
          <a onClick={() => handleClick("contact")} href="#contact">Contact Us</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
