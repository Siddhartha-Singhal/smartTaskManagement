import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm py-3">
      <div className="container-fluid px-4">
        <span className="navbar-brand mb-0 h1 fw-bold tracking-wide">
          <i className="bi bi-briefcase-fill me-2"></i> Executive Task Hub
        </span>
        <span className="text-secondary small">Enterprise Solutions</span>
      </div>
    </nav>
  );
};

export default Navbar;