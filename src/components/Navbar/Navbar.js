import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">LOGO</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">About Us</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Features
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Feature 1</a></li>
            <li><a className="dropdown-item" href="#">Feature 2</a></li>
            
            </ul>
        </li>
        
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
     <div style={{marginLeft: 10}}>
     <button type="button" className="btn btn-primary">Login</button>
     <button type="button" className="btn btn-info">Register</button>
     </div>
    </div>
  </div>
</nav>
    </>
  );
};

export default Navbar;
