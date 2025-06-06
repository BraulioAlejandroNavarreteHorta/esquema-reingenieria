import React from 'react';

function Footer({ nombre }) {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <p className="footer-texto">
        {nombre} | {year} | Esquema Interactivo de Reingeniería de Software
      </p>
    </footer>
  );
}

export default Footer; 