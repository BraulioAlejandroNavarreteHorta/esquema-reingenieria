import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="logo">Reingeniería de Software</div>
      <div className="menu">
        <div className="menu-item">Inicio</div>
        <div className="menu-item">Conceptos</div>
        <div className="menu-item">Relaciones</div>
        <div className="menu-item">Referencias</div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 