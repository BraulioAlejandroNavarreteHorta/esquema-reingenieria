import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Concepto = ({ concepto, index, seleccionar, conceptos }) => {
  const ref = useRef(null);
  
  // Establecer variables CSS personalizadas para colores
  useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty('--color-primario', concepto.color);
      ref.current.style.setProperty('--color-primario-claro', concepto.color + '80');
    }
  }, [concepto.color]);

  // Buscar los conceptos relacionados
  const relacionados = concepto.relacionados.map(id => 
    conceptos.find(c => c.id === id)
  ).filter(Boolean);

  return (
    <motion.div
      ref={ref}
      className="concepto-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1 + 0.5,
        type: "spring",
        stiffness: 100
      }}
      onClick={() => seleccionar(concepto)}
      whileHover={{ y: -10 }}
    >
      <div className="concepto-icono float-animation">
        {concepto.icono}
      </div>
      
      <h3 className="concepto-titulo">{concepto.titulo}</h3>
      
      <p className="concepto-descripcion">
        {concepto.descripcion}
      </p>
      
      <div className="concepto-relacionados">
        {relacionados.map(relacionado => (
          <div 
            key={relacionado.id} 
            className="concepto-relacionado"
            style={{ '--color-primario': relacionado.color }}
          >
            {relacionado.titulo.split(' ')[0]}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Concepto; 