import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Handle,
  Position
} from 'reactflow';
// import 'reactflow/dist/style.css'; // Movido a App.js para resolver problema de build
import { conceptos } from './conceptosData';
import './Conceptos.css';

// Nodo personalizado para tener más control sobre el estilo
const CustomNode = ({ data }) => {
    return (
      <div className={`custom-node ${data.isMain ? 'main-node' : 'sub-node'}`}>
        <Handle type="target" position={Position.Top} />
        <div>{data.label}</div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    );
};

const nodeTypes = {
    custom: CustomNode,
};

// --- NUEVA LÓGICA DE PROCESAMIENTO ---
const getProcessedData = () => {
    return conceptos.map(concepto => {
        const newContent = [];
        let i = 0;
        while (i < concepto.content.length) {
            const currentItem = concepto.content[i];
            const nextItem = (i + 1 < concepto.content.length) ? concepto.content[i+1] : null;

            // Si el elemento actual es un subtítulo y el siguiente es una lista, tabla o párrafo, los fusionamos.
            if (currentItem.type === 'subtitle' && nextItem && (nextItem.type === 'list' || nextItem.type === 'table' || nextItem.type === 'paragraph')) {
                newContent.push({
                    type: 'composite',
                    title: currentItem.text,
                    data: nextItem,
                });
                i += 2; // Saltamos el siguiente elemento porque ya ha sido fusionado.
            } else {
                newContent.push(currentItem);
                i += 1;
            }
        }
        return { ...concepto, content: newContent };
    });
};

// Lógica para transformar la data en un grafo complejo
const transformDataToFlow = (processedData) => {
    const nodes = [];
    const edges = [];
    const mainNodeSpacingX = 1800; // Aumentado para más espacio horizontal
    const mainNodeSpacingY = 1500; // Aumentado para más espacio vertical

    // 1. Crear nodos principales (soles)
    processedData.forEach((concepto, index) => {
        nodes.push({
            id: concepto.id,
            type: 'custom',
            data: { 
                label: concepto.title, 
                isMain: true,
                fullContent: concepto // Guardamos todo el concepto para el panel
            },
            position: { 
                x: (index % 2) * mainNodeSpacingX, 
                y: Math.floor(index / 2) * mainNodeSpacingY 
            },
        });
    });

    // 2. Crear nodos secundarios (planetas) y conectarlos
    processedData.forEach((concepto) => {
        const parentNode = nodes.find(n => n.id === concepto.id);
        let previousChildNodeId = null;

        concepto.content.forEach((item, contentIndex) => {
            const childNodeId = `${concepto.id}-${item.type}-${contentIndex}`;
            let label = '';
            
            if (item.type === 'composite') {
                label = item.title;
            } else if (item.type === 'subtitle') {
                label = item.text;
            } else if (item.type === 'paragraph') {
                label = item.text.split(' ').slice(0, 5).join(' ') + '...';
            } else {
                // Ya no deberíamos tener listas o tablas sueltas, pero lo dejamos como fallback.
                label = `(${item.type.charAt(0).toUpperCase() + item.type.slice(1)})`;
            }

            // --- LÓGICA DE POSICIONAMIENTO EN REJILLA ---
            const parentPos = parentNode.position;
            const columns = 4; // Máximo de 4 nodos por fila
            const col = contentIndex % columns;
            const row = Math.floor(contentIndex / columns);
            const xOffset = 240; // Espacio horizontal entre nodos hijos
            const yOffset = 120; // Espacio vertical entre nodos hijos

            const x = parentPos.x + (col - (columns - 1) / 2) * xOffset;
            const y = parentPos.y + 200 + row * yOffset; // Empezar 200px debajo del padre

            nodes.push({
                id: childNodeId,
                type: 'custom',
                data: { 
                    label: label, 
                    fullContentItem: item,
                    isMain: false
                },
                position: { x, y },
            });

            // Conexión del padre al hijo (línea recta)
            edges.push({
                id: `edge-parent-${childNodeId}`,
                source: parentNode.id,
                target: childNodeId,
                type: 'straight',
                style: { stroke: '#4A5568', strokeWidth: 1 },
            });
            
            // Conexión secuencial entre hijos
            if (previousChildNodeId) {
                 edges.push({
                    id: `edge-flow-${previousChildNodeId}-${childNodeId}`,
                    source: previousChildNodeId,
                    target: childNodeId,
                    animated: false,
                    type: 'smoothstep',
                    style: { stroke: '#3f51b5', strokeWidth: 1.5 },
                });
            }
            previousChildNodeId = childNodeId;
        });
    });

    // 3. Conectar los nodos principales entre sí
    for (let i = 0; i < processedData.length - 1; i++) {
        edges.push({
            id: `edge-main-${processedData[i].id}-${processedData[i+1].id}`,
            source: processedData[i].id,
            target: processedData[i+1].id,
            type: 'smoothstep',
            style: { stroke: '#A0AEC0', strokeWidth: 3, strokeDasharray: '5,5' },
        });
    }

    return { initialNodes: nodes, initialEdges: edges };
};

const renderContentItem = (item, index) => (
    <div key={index} className="content-item">
        {item.type === 'composite' && (
            <div>
                <h4>{item.title}</h4>
                {/* Renderiza el contenido de la lista/tabla fusionada */}
                {renderContentItem(item.data, 0)}
            </div>
        )}
        {item.type === 'subtitle' && <h4>{item.text}</h4>}
        {item.type === 'paragraph' && <p>{item.text}</p>}
        {item.type === 'list' && (
            <ul>
                {item.items.map((li, i) => (
                    <li key={i}>
                        {typeof li === 'string' ? li : (
                            <><strong>{li.title}:</strong> {li.text}</>
                        )}
                    </li>
                ))}
            </ul>
        )}
        {item.type === 'table' && (
            <table>
                <thead><tr>{item.headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
                <tbody>{item.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
            </table>
        )}
    </div>
);

const ConceptosGrafo = () => {
    const processedData = useMemo(() => getProcessedData(), []);
    const { initialNodes, initialEdges } = useMemo(() => transformDataToFlow(processedData), [processedData]);
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [selectedNodeContent, setSelectedNodeContent] = useState(null);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    const onNodeClick = useCallback((event, node) => {
        if (node.data.isMain) {
            // Buscamos el concepto procesado completo
            const fullConcept = processedData.find(c => c.id === node.id);
            setSelectedNodeContent({
                title: node.data.label,
                content: fullConcept.content
            });
        } else {
            setSelectedNodeContent({
                title: node.data.label,
                content: [node.data.fullContentItem]
            });
        }
    }, [processedData]);

    return (
        <div className="conceptos-grafo-container">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                className="react-flow-subtle"
            >
                <Controls />
                <Background color="#1a1a1a" gap={20} variant="dots" />
            </ReactFlow>

            {selectedNodeContent && (
                <div className="panel-detalles">
                    <button className="close-btn" onClick={() => setSelectedNodeContent(null)}>×</button>
                    <h2>{selectedNodeContent.title}</h2>
                    <div className="panel-contenido">
                        {selectedNodeContent.content.map(renderContentItem)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConceptosGrafo; 