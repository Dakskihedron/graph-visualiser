import Vertex from "./vertex.js";

export default class Edge {
    private startVertex: Vertex;
    private endVertex: Vertex;
    private edge: SVGPathElement;
    private weight: number;

    public constructor(start: Vertex, end: Vertex, weight: number = 0) {
        this.startVertex = start;
        this.endVertex = end;
        this.edge = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.weight = weight;
    }

    public createDOMObject(mx: number, my: number, lx: number, ly: number): void {
        const edgeAttributes: { [key: string]: string } = {
            class: "edge",
            d: `M ${mx},${my} L ${lx},${ly}`,
            stroke: "black",
            "stroke-width": "3",
            fill: "none",
            "marker-end": "url(#arrow)",
        };

        Object.keys(edgeAttributes).forEach(attr => {
            this.edge.setAttributeNS(null, attr, edgeAttributes[attr]);
        });

        this.startVertex.addEdge(this);
        this.startVertex.addNeighbour(this.endVertex);
        this.endVertex.addEdge(this);
        document.getElementById("graphEdgesGroup")!.appendChild(this.edge);
    }

    public destroyDOMObject(): void {
        this.startVertex.removeEdge(this);
        this.startVertex.removeNeighbour(this.endVertex);
        this.endVertex.removeEdge(this);
        this.edge.remove();
    }

    public getDOMObject(): SVGPathElement {
        return this.edge;
    }

    public getWeight(): number {
        return this.weight;
    }

    public setWeight(weight: number): void {
        this.weight = weight;
    }

    public getStartVertex(): Vertex {
        return this.startVertex;
    }

    public getEndVertex(): Vertex {
        return this.endVertex;
    }
}
