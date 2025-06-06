import React, { useState, useEffect } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion, AnimatePresence } from "framer-motion";
import './App.css';
import { iconos } from './components/Iconos';
import Footer from './components/Footer';

function App() {
  const [conceptoSeleccionado, setConceptoSeleccionado] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [showContacto, setShowContacto] = useState(false);
  
  // Palabras relacionadas con reingeniería que se mostrarán en rotación
  const palabrasClave = [
    {
      texto: "DevOps_",
      descripcion: "La reingeniería de software es fundamental para mantener sistemas críticos adaptados a tecnologías modernas."
    },
    {
      texto: "Reingeniería_",
      descripcion: "Proceso de reestructuración profunda que mejora la calidad, rendimiento y mantenibilidad del software."
    },
    {
      texto: "Sistemas_",
      descripcion: "Los sistemas heredados requieren actualización para adaptarse a las necesidades empresariales actuales."
    },
    {
      texto: "Migración_",
      descripcion: "Transferencia de sistemas a nuevas plataformas tecnológicas manteniendo su funcionalidad esencial."
    },
    {
      texto: "Legado_",
      descripcion: "El software legado representa un desafío y una oportunidad para la modernización tecnológica."
    },
    {
      texto: "Reestructuración_",
      descripcion: "Transformación del código preservando el comportamiento externo pero mejorando su estructura interna."
    },
    {
      texto: "Transformación_",
      descripcion: "Cambio profundo en arquitectura y diseño para adaptarse a nuevos paradigmas tecnológicos."
    },
    {
      texto: "Documentación_",
      descripcion: "La documentación técnica actualizada es esencial para el mantenimiento efectivo de sistemas."
    },
    {
      texto: "Análisis_",
      descripcion: "La comprensión profunda del sistema existente es el primer paso para su reingeniería exitosa."
    },
    {
      texto: "Innovación_",
      descripcion: "La reingeniería abre camino a la innovación mediante la modernización de procesos y sistemas."
    }
  ];
  
  // Efecto para actualizar la hora
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds} p.m. @ America/Mexico_City`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Efecto para cambiar las palabras clave
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % palabrasClave.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Actualizado para tsparticles v3
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesConfig = {
    particles: {
      number: {
        value: 120,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#ffffff"
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 0.5,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 1.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          size_min: 0.1,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.15,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: "out",
        attract: {
          enable: true,
          rotate: {
            x: 600,
            y: 1200
          }
        }
      }
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "grab"
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5
          }
        },
        push: {
          quantity: 3
        }
      }
    },
    detectRetina: true
  };

  const conceptos = [
    {
      id: 1,
      titulo: "Reingeniería de Software",
      icono: "reingenieria",
      descripcion: "Proceso de reestructuración profunda de sistemas existentes para mejorar su calidad, rendimiento y mantenibilidad.",
      relacionados: ["sistemas", "procesos", "transformacion"],
      secciones: [
        {
          titulo: "Objetivos",
          contenido: "Mejorar la calidad del software, reducir costos de mantenimiento, adaptar el sistema a nuevas tecnologías y requerimientos."
        },
        {
          titulo: "Metodología",
          contenido: "Análisis del sistema actual, rediseño de la arquitectura, implementación y migración incremental."
        },
        {
          titulo: "Herramientas",
          contenido: "Analizadores de código, herramientas de ingeniería inversa, entornos de desarrollo integrados, sistemas de control de versiones."
        }
      ]
    },
    {
      id: 2,
      titulo: "Ingeniería Inversa",
      icono: "ingenieria",
      descripcion: "Proceso de análisis de un sistema para identificar sus componentes y relaciones para crear abstracciones del mismo.",
      relacionados: ["analisis", "sistemas", "componentes"],
      secciones: [
        {
          titulo: "Técnicas",
          contenido: "Análisis de código fuente, desensamblaje, análisis de binarios, decompilación, observación de comportamiento."
        },
        {
          titulo: "Aplicaciones",
          contenido: "Recuperación de diseño, documentación, comprensión de sistemas legados, adaptación a nuevas plataformas."
        },
        {
          titulo: "Limitaciones",
          contenido: "Pérdida de información de diseño original, complejidad en sistemas grandes, restricciones legales."
        }
      ]
    },
    {
      id: 3,
      titulo: "Reestructuración",
      icono: "reestructuracion",
      descripcion: "Transformación de un sistema de una representación a otra al mismo nivel de abstracción, preservando su comportamiento externo.",
      relacionados: ["refactorizacion", "transformacion", "codigo"],
      secciones: [
        {
          titulo: "Niveles",
          contenido: "Reestructuración de código, datos, interfaces, diseño y arquitectura."
        },
        {
          titulo: "Beneficios",
          contenido: "Mejora de mantenibilidad, reducción de complejidad, mejor organización del código, preparación para evolución."
        },
        {
          titulo: "Estrategias",
          contenido: "Refactorización sistemática, automatización de transformaciones, pruebas de regresión, integración continua."
        }
      ]
    },
    {
      id: 4,
      titulo: "Redocumentación",
      icono: "redocumentacion",
      descripcion: "Creación o revisión de la documentación técnica y funcional de un sistema existente para mejorar su comprensión.",
      relacionados: ["documentacion", "mantenimiento", "conocimiento"],
      secciones: [
        {
          titulo: "Tipos",
          contenido: "Documentación de código, arquitectura, APIs, guías de usuario, requisitos, manuales de operación."
        },
        {
          titulo: "Herramientas",
          contenido: "Generadores automáticos de documentación, wikis, repositorios de conocimiento, herramientas de visualización."
        },
        {
          titulo: "Proceso",
          contenido: "Auditoría de documentación existente, extracción de conocimiento, actualización, validación, publicación y mantenimiento."
        }
      ]
    },
    {
      id: 5,
      titulo: "Migración",
      icono: "migracion",
      descripcion: "Proceso de transferir un sistema de software de un entorno tecnológico a otro, manteniendo su funcionalidad esencial.",
      relacionados: ["plataformas", "tecnologia", "transicion"],
      secciones: [
        {
          titulo: "Estrategias",
          contenido: "Migración big-bang, incremental, en paralelo, por fases o híbrida."
        },
        {
          titulo: "Desafíos",
          contenido: "Incompatibilidades tecnológicas, preservación de datos, minimización de interrupciones, validación de equivalencia funcional."
        },
        {
          titulo: "Factores de éxito",
          contenido: "Planificación detallada, pruebas exhaustivas, capacitación del personal, gestión de riesgos, comunicación efectiva."
        }
      ]
    },
    {
      id: 6,
      titulo: "Sistemas Heredados",
      icono: "sistemas",
      descripcion: "Sistemas informáticos antiguos pero críticos que siguen en uso a pesar de su obsolescencia tecnológica.",
      relacionados: ["legado", "mantenimiento", "obsolescencia"],
      secciones: [
        {
          titulo: "Características",
          contenido: "Tecnología obsoleta, documentación insuficiente, alto costo de mantenimiento, dificultad de integración con sistemas modernos."
        },
        {
          titulo: "Estrategias de gestión",
          contenido: "Mantenimiento continuo, encapsulación, reemplazo gradual, retirada planificada, modernización."
        },
        {
          titulo: "Evaluación",
          contenido: "Análisis de valor empresarial, evaluación técnica, costos de mantenimiento versus reemplazo, análisis de riesgos."
        }
      ]
    },
    {
      id: 7,
      titulo: "Software Legado",
      icono: "legacy",
      descripcion: "Código fuente o programas antiguos que continúan utilizándose y que fueron desarrollados con técnicas o tecnologías obsoletas.",
      relacionados: ["codigo", "sistemas", "mantenimiento"],
      secciones: [
        {
          titulo: "Problemas comunes",
          contenido: "Deuda técnica, seguridad comprometida, falta de escalabilidad, incompatibilidad con tecnologías modernas, conocimiento perdido."
        },
        {
          titulo: "Enfoques de renovación",
          contenido: "Refactorización incremental, reescritura selectiva, migración a microservicios, adopción de patrones modernos."
        },
        {
          titulo: "Herramientas",
          contenido: "Analizadores de código estático, herramientas de refactorización, frameworks de adaptación, envoltorios (wrappers)."
        }
      ]
    },
    {
      id: 8,
      titulo: "Infraestructura TI",
      icono: "infraestructura",
      descripcion: "Conjunto de hardware, software, redes y servicios necesarios para operar y gestionar el entorno IT de una organización.",
      relacionados: ["hardware", "software", "redes"],
      secciones: [
        {
          titulo: "Componentes",
          contenido: "Servidores, almacenamiento, redes, sistemas operativos, virtualización, middleware, seguridad, gestión de identidades."
        },
        {
          titulo: "Modernización",
          contenido: "Adopción de cloud computing, virtualización, contenedores, automatización, infraestructura como código, DevOps."
        },
        {
          titulo: "Gestión",
          contenido: "Monitorización, aprovisionamiento automatizado, gestión de capacidad, seguridad, continuidad de negocio, recuperación ante desastres."
        }
      ]
    },
    {
      id: 9,
      titulo: "Reingeniería en TICs",
      icono: "tics",
      descripcion: "Aplicación de principios de reingeniería a las tecnologías de información y comunicación para transformación digital.",
      relacionados: ["transformacion", "procesos", "tecnologia"],
      secciones: [
        {
          titulo: "Pilares",
          contenido: "Rediseño de procesos, transformación tecnológica, gestión del cambio organizacional, innovación continua."
        },
        {
          titulo: "Habilitadores",
          contenido: "Cloud computing, big data, inteligencia artificial, Internet de las cosas, automatización, análisis predictivo."
        },
        {
          titulo: "Impacto",
          contenido: "Agilidad empresarial, nuevos modelos de negocio, mejora de experiencia del usuario, eficiencia operativa, ventajas competitivas."
        }
      ]
    }
  ];

  // Elementos decorativos
  const decoracionesEspaciales = [
    { tipo: 'linea-horizontal', top: '25%', left: '5%', width: '20%' },
    { tipo: 'linea-horizontal', top: '40%', right: '5%', width: '15%' },
    { tipo: 'linea-horizontal', bottom: '30%', left: '10%', width: '25%' },
    { tipo: 'circulo-decorativo', top: '15%', right: '15%', width: '250px', height: '250px' },
    { tipo: 'circulo-decorativo', bottom: '10%', left: '10%', width: '200px', height: '200px' },
    { tipo: 'circulo-decorativo', top: '60%', left: '30%', width: '150px', height: '150px' }
  ];

  // Generar puntos brillantes aleatorios
  const puntosAleatorios = Array.from({ length: 30 }, (_, i) => ({
    tipo: 'punto-brillante',
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.5 + 0.2,
    animationDelay: `${Math.random() * 5}s`
  }));

  return (
    <div className="App">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
      />
      
      {/* Elementos decorativos */}
      {decoracionesEspaciales.map((elem, index) => (
        <div 
          key={`dec-${index}`} 
          className={`decoracion-espacial ${elem.tipo}`}
          style={{
            top: elem.top,
            left: elem.left,
            right: elem.right,
            bottom: elem.bottom,
            width: elem.width,
            height: elem.height
          }}
        />
      ))}
      
      {puntosAleatorios.map((punto, index) => (
        <div 
          key={`punto-${index}`} 
          className={`decoracion-espacial ${punto.tipo}`}
          style={{
            top: punto.top,
            left: punto.left,
            opacity: punto.opacity,
            animationDelay: punto.animationDelay
          }}
        />
      ))}
      
      <nav className="navbar">
        <div className="logo">Reingeniería.SW</div>
        <div className="menu">
          <div className="menu-item" onClick={() => setShowContacto(true)}>Contacto</div>
        </div>
      </nav>
      
      <div className="contenedor-principal">
        <h1 className="titulo-principal">Braulio Navarrete</h1>
        <div className="nombre-estudiante">
          <motion.p
            key={textIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {palabrasClave[textIndex].texto}
          </motion.p>
        </div>
        <div className="time-display">{currentTime}</div>
        
        <motion.p 
          key={`desc-${textIndex}`}
          className="descripcion-principal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {palabrasClave[textIndex].descripcion}
        </motion.p>
        
        
        
        <div className="esquema-conceptos">
          {conceptos.map((concepto) => (
            <motion.div
              key={concepto.id}
              className="concepto-card"
              onClick={() => setConceptoSeleccionado(concepto)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: concepto.id * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="concepto-icono">
                {iconos[concepto.icono] || iconos.default}
              </div>
              <h3 className="concepto-titulo">{concepto.titulo}</h3>
              <p className="concepto-descripcion">{concepto.descripcion}</p>
              <div className="concepto-relacionados">
                {concepto.relacionados.map((rel, idx) => (
                  <span key={idx} className="concepto-relacionado">{rel}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Modal de Contacto */}
      <AnimatePresence>
        {showContacto && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContacto(false)}
          >
            <motion.div
              className="modal-contacto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-close" onClick={() => setShowContacto(false)}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="modal-logo">
                <img src="/xenoma logo hortizonntal.svg" alt="Xenoma Logo" />
              </div>
              <div className="modal-content">
                <h2>Información de contacto</h2>
                <div className="contacto-info">
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#841dad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span><strong>Ing. Braulio Alejandro Navarrete Horta</strong></span>
                  </p>
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#841dad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <span>Co-Founder XENOMACODE</span>
                  </p>
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#841dad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>brauilio.navarrete@xenomacode.com</span>
                  </p>
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#841dad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>+524772275165</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Detalle de Concepto */}
      <AnimatePresence>
        {conceptoSeleccionado && (
          <motion.div
            className="concepto-detalle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConceptoSeleccionado(null)}
          >
            <motion.div
              className="detalle-contenedor"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="detalle-header">
                <div className="detalle-cerrar" onClick={() => setConceptoSeleccionado(null)}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="detalle-titulo">{conceptoSeleccionado.titulo}</h2>
                <p className="detalle-descripcion">{conceptoSeleccionado.descripcion}</p>
              </div>
              
              <div className="detalle-contenido">
                <div className="detalle-secciones">
                  {conceptoSeleccionado.secciones.map((seccion, idx) => (
                    <motion.div
                      key={idx}
                      className="detalle-seccion"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <h3 className="seccion-titulo">{seccion.titulo}</h3>
                      <p className="seccion-contenido">{seccion.contenido}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="detalle-relacionados">
                  <h3 className="relacionados-titulo">Conceptos relacionados</h3>
                  <div className="relacionados-lista">
                    {conceptoSeleccionado.relacionados.map((rel, idx) => {
                      const conceptoRelacionado = conceptos.find(c => 
                        c.relacionados.includes(rel) && c.id !== conceptoSeleccionado.id
                      );
                      
                      if (!conceptoRelacionado) return null;
                      
                      return (
                        <div 
                          key={idx} 
                          className="relacionado-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConceptoSeleccionado(conceptoRelacionado);
                          }}
                        >
                          <div className="relacionado-icono">
                            {iconos[conceptoRelacionado.icono] || iconos.default}
                          </div>
                          <span>{conceptoRelacionado.titulo}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer nombre="74570_Braulio Alejandro Navarrete Horta" />
    </div>
  );
}

export default App;
