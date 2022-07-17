import { MouseEvent, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Edge, Vertex } from "../types/GraphTypes";
import "./Graph.css";

let currentVertexId = 0;

const Graph = () => {
  const svgRef = useRef(null);
  const svg = d3.select(svgRef.current);

  const [vertices, setVertices] = useState<Vertex[]>([]);
  const dataRef = useRef(vertices);

  const [edges, setEdges] = useState<Edge[]>([]);

  const addEdgeStart = (e: MouseEvent) => {};

  const addEdgeEnd = (e: MouseEvent) => {};

  const removeEdge = (e: MouseEvent) => {
    e.preventDefault();
  };

  const addVertex = (e: MouseEvent) => {
    if (!(e.target instanceof SVGSVGElement)) return;
    const coords = d3.pointer(e, e.target);
    const newVertex = { id: currentVertexId++, x: coords[0], y: coords[1] };
    setVertices(current => [...current, newVertex]);
  };

  const removeVertex = (e: MouseEvent) => {
    e.preventDefault();
    const updatedVertices = dataRef.current.filter(
      v => v.id !== parseInt(e.currentTarget.id)
    );
    setVertices(updatedVertices);
  };

  useEffect(() => {
    dataRef.current = vertices;
  }, [vertices]);

  const vertex = svg
    .selectAll<SVGGElement, Vertex>(".vertex")
    .data(vertices, d => d.id);

  const simulation = d3.forceSimulation(vertices);
  // .force("charge", d3.forceManyBody().strength(1))
  // .force(
  //   "collide",
  //   d3.forceCollide().radius(100).strength(0.1).iterations(1)
  // );

  simulation.nodes(vertices);
  simulation.restart();

  vertex.exit().remove();

  const vertexElement = vertex
    .enter()
    .append("g")
    .attr("id", d => d.id)
    .classed("vertex", true)
    .attr("transform", d => `translate(${d.x},${d.y})`)
    .on("contextmenu", removeVertex);

  vertexElement
    .append("circle")
    .attr("r", 30)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 3);

  vertexElement
    .append("text")
    .text(d => d.id)
    .attr("dy", ".35em")
    .attr("fill", "black")
    .attr("stroke", "black")
    .attr("font-size", "25px")
    .attr("text-anchor", "middle");

  simulation.on("tick", () => {
    vertex
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .call(
        d3
          .drag<SVGGElement, Vertex>()
          .on("start", function () {
            simulation.alphaTarget(0.03).restart();
          })
          .on("drag", function (e: DragEvent, d: Vertex) {
            d.x = e.x;
            d.y = e.y;
            d3.select(this).attr("transform", `translate(${d.x},${d.y})`);
          })
          .on("end", () => {
            simulation.alphaTarget(0).restart();
          })
      );
  });

  return (
    <svg
      ref={svgRef}
      id={"graph"}
      onClick={addVertex}
      onContextMenu={e => e.preventDefault()}
    ></svg>
  );
};

export default Graph;
