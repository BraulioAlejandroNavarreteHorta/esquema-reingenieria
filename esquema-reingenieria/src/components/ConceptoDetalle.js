import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconoCerrar } from './Iconos';

const ConceptoDetalle = ({ concepto, cerrar, conceptos, seleccionar }) => {
  const detalleRef = useRef(null);
  
  // Establecer variables CSS personalizadas para colores
  useEffect(() => {
    if (detalleRef.current) {
      detalleRef.current.style.setProperty('--color-primario', concepto.color);
      detalleRef.current.style.setProperty('--color-primario-claro', concepto.color + '80');
    }
  }, [concepto.color]);

  // Datos de detalle específicos para cada concepto
  const detallesConcepto = {
    reingenieria: {
      secciones: [
        {
          titulo: "Definición",
          contenido: "Proceso sistemático que analiza y modifica sistemas de software existentes para mejorar su calidad, rendimiento, funcionalidad y adaptabilidad a nuevas necesidades y tecnologías."
        },
        {
          titulo: "Objetivos",
          contenido: "Mejorar calidad, reducir costos de mantenimiento, aumentar funcionalidad, adaptarse a nuevas tecnologías, optimizar procesos y extender la vida útil del software."
        },
        {
          titulo: "Actividades",
          contenido: "Incluye refactorización del código, migración a nuevas plataformas e incorporación de buenas prácticas de desarrollo mientras se mantiene el sistema operativo."
        }
      ]
    },
    proceso: {
      secciones: [
        {
          titulo: "Definición",
          contenido: "Conjunto de actividades planificadas que implican la participación de personas y recursos materiales coordinados para conseguir un objetivo específico."
        },
        {
          titulo: "Características",
          contenido: "Secuencia definida, entradas y salidas identificables, genera valor, tiene un propósito y puede medirse y optimizarse continuamente."
        },
        {
          titulo: "Procesos medulares",
          contenido: "Las empresas suelen tener 6 procesos generales: Compra, Manufactura, Ventas, Distribución, Mercadotecnia y Administración."
        }
      ]
    },
    crisisSoftware: {
      secciones: [
        {
          titulo: "Definición",
          contenido: "Incapacidad de las metodologías tradicionales para satisfacer necesidades empresariales en cuanto a calidad, tiempo de desarrollo y presupuesto."
        },
        {
          titulo: "Síntomas",
          contenido: "Baja funcionalidad, funcionalidad incorrecta, diseño poco estructurado, imprecisión en planificación, confiabilidad cuestionable y altos requerimientos de personal."
        },
        {
          titulo: "Mitos",
          contenido: "Basta con tener estándares, lo importante es tecnología de punta, programar inmediatamente, los cambios son fáciles, el código es el único producto."
        }
      ]
    },
    mantenimiento: {
      secciones: [
        {
          titulo: "Tipos",
          contenido: "Correctivo (resolver fallos), Adaptativo (adaptarse a cambios externos), Perfectivo (mejorar rendimiento) y Preventivo (prevenir futuros problemas)."
        },
        {
          titulo: "Mantenimiento correctivo",
          contenido: "Se realiza ante fallos para restablecer la operación esperada. Enfocado en la funcionalidad, buscando que el sistema haga lo que debe correctamente."
        },
        {
          titulo: "Mantenimiento adaptativo",
          contenido: "Adapta el software para hacer frente a cambios en el entorno, ya sean originados por el hardware o por factores externos como regulaciones."
        }
      ]
    },
    auditoria: {
      secciones: [
        {
          titulo: "Definición",
          contenido: "Proceso formal para verificar y asegurar que las políticas y procedimientos para el manejo de tecnologías de información se realicen de manera oportuna y eficiente."
        },
        {
          titulo: "Tipos",
          contenido: "Auditoría de sistemas, de explotación, de comunicaciones/infraestructura, de desarrollo de software, de seguridad y de calidad."
        },
        {
          titulo: "Controles internos",
          contenido: "Preventivos (evitar errores), De detección (identificar problemas), Correctivos (minimizar daños), Físicos y Lógicos."
        }
      ]
    },
    drp: {
      secciones: [
        {
          titulo: "Definición",
          contenido: "Plan que protege la información, hardware y software ante anomalías naturales o causadas por personas, garantizando la continuidad del negocio."
        },
        {
          titulo: "Fases",
          contenido: "Determinar necesidades, seleccionar equipo, identificar planes alternativos, escribir, probar, capacitar, implementar, evaluar y mantener el plan."
        },
        {
          titulo: "Componentes clave",
          contenido: "Medidas preventivas, de detección y correctivas; copias de seguridad, protección física, sistemas redundantes y procedimientos de recuperación."
        }
      ]
    },
    verificacion: {
      secciones: [
        {
          titulo: "Verificación",
          contenido: "Proceso para determinar si los productos de una fase del desarrollo cumplen con los requisitos establecidos en la fase previa."
        },
        {
          titulo: "Validación",
          contenido: "Proceso para determinar si el software satisface su especificación y cumple con las expectativas del cliente."
        },
        {
          titulo: "Pruebas",
          contenido: "Estructurales (caja blanca), Funcionales (caja negra), Casos de prueba, Clases equivalentes, Valores límite y Grafos causa-efecto."
        }
      ]
    },
    calidad: {
      secciones: [
        {
          titulo: "Definición",
          contenido: "Capacidad del sistema para cumplir requisitos establecidos, ser confiable, fácil de mantener y satisfactorio para los usuarios."
        },
        {
          titulo: "Características",
          contenido: "Fiabilidad (funcionamiento correcto), Eficiencia (uso adecuado de recursos), Usabilidad (interfaz intuitiva) y Mantenibilidad (facilidad para modificar)."
        },
        {
          titulo: "Estándares",
          contenido: "ISO 9001, CMMI (Capability Maturity Model Integration), IEEE 829 y otros que definen requisitos para desarrollo, mantenimiento y gestión."
        }
      ]
    },
    pareto: {
      secciones: [
        {
          titulo: "Principio de Pareto",
          contenido: "Regla del 80/20 que establece que el 80% de los efectos provienen del 20% de las causas, permitiendo priorizar problemas que generarán mayor impacto positivo."
        },
        {
          titulo: "Diagrama de Ishikawa",
          contenido: "Representación gráfica en forma de espina de pescado que organiza las posibles causas de un problema, agrupándolas en categorías para análisis sistemático."
        },
        {
          titulo: "Aplicaciones",
          contenido: "Análisis de problemas, identificación de causas raíz, mejora continua, auditorías, control de calidad y gestión de proyectos de software."
        }
      ]
    }
  };

  // Obtener el detalle específico del concepto seleccionado
  const detalle = detallesConcepto[concepto.id] || {
    secciones: [
      {
        titulo: "Información",
        contenido: "Información detallada no disponible para este concepto."
      }
    ]
  };

  // Buscar los conceptos relacionados
  const relacionados = concepto.relacionados.map(id => 
    conceptos.find(c => c.id === id)
  ).filter(Boolean);

  return (
    <motion.div
      className="concepto-detalle"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="detalle-contenedor"
        ref={detalleRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="detalle-header">
          <div className="detalle-cerrar" onClick={cerrar}>
            <IconoCerrar />
          </div>
          
          <h2 className="detalle-titulo">{concepto.titulo}</h2>
          <p className="detalle-descripcion">{concepto.descripcion}</p>
        </div>
        
        <div className="detalle-contenido">
          <div className="detalle-secciones">
            {detalle.secciones.map((seccion, index) => (
              <motion.div 
                key={index} 
                className="detalle-seccion"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="seccion-titulo">{seccion.titulo}</h3>
                <p className="seccion-contenido">{seccion.contenido}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="detalle-relacionados"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="relacionados-titulo">Conceptos relacionados</h3>
            <div className="relacionados-lista">
              {relacionados.map(relacionado => (
                <div 
                  key={relacionado.id} 
                  className="relacionado-item"
                  style={{ '--color-relacionado': relacionado.color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    seleccionar(relacionado);
                  }}
                >
                  <div className="relacionado-icono">
                    {relacionado.icono}
                  </div>
                  {relacionado.titulo}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConceptoDetalle; 