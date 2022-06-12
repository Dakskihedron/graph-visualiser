import Vertex from "./vertex.js";

export default class Edge {
    private startVertex: Vertex;
    private endVertex: Vertex;
    private weight: number;

    private edgeGroup: SVGGElement;
    private edgePath: SVGPathElement;
    private edgeText: SVGTextElement;

    public constructor(start: Vertex, end: Vertex, weight: number = 0) {
        this.startVertex = start;
        this.endVertex = end;
        this.weight = weight;

        this.edgeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.edgePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.edgeText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    }

    public createDOMObject(mx: number, my: number, lx: number, ly: number): void {
        this.edgeGroup.setAttributeNS(null, "class", "edge");
        this.edgeText.textContent = String(this.weight);

        const pathAttributes: { [key: string]: string } = {
            d: `M ${mx},${my} L ${lx},${ly}`,
            stroke: "black",
            "stroke-width": "3",
            fill: "none",
            "marker-end": "url(#arrow)",
        };

        Object.keys(pathAttributes).forEach(attr => {
            this.edgePath.setAttributeNS(null, attr, pathAttributes[attr]);
        });

        const sc = this.startVertex.getVertexCoords();
        const ec = this.endVertex.getVertexCoords();
        const midpoint = { x: (sc.x + ec.x) / 2, y: (sc.y + ec.y) / 2 };
        const slope = (ec.y - sc.y) / (ec.x - sc.x);
        const dy = Math.sqrt(Math.pow(14, 2) / (Math.pow(slope, 2) + 1));
        const dx = -slope * dy;

        const textAttributes: { [key: string]: string } = {
            x: String(midpoint.x + dx),
            y: String(midpoint.y + dy),
            dy: ".35em",
            stroke: "black",
            "stroke-width": "1",
            "font-size": "15px",
        };

        Object.keys(textAttributes).forEach(attr => {
            this.edgeText.setAttributeNS(null, attr, textAttributes[attr]);
        });

        this.startVertex.addEdge(this);
        this.startVertex.addNeighbour(this.endVertex);
        this.endVertex.addEdge(this);

        this.edgeGroup.appendChild(this.edgePath);
        this.edgeGroup.appendChild(this.edgeText);
        document.getElementById("graphEdgesGroup")!.appendChild(this.edgeGroup);
    }

    public destroyDOMObject(): void {
        this.startVertex.removeEdge(this);
        this.startVertex.removeNeighbour(this.endVertex);
        this.endVertex.removeEdge(this);
        this.edgeGroup.remove();
    }

    public getDOMObject(): SVGGElement {
        return this.edgeGroup;
    }

    public getWeight(): number {
        return this.weight;
    }

    public setWeight(): void {
        let weight: string | null = prompt("Set new weight:", String(this.weight));
        if (!weight || !weight.trim()) {
            return alert("Not a number.");
        }
        let intWeight = parseInt(weight, 10);
        if (isNaN(intWeight)) {
            return alert("Not a number.")
        }
        this.weight = intWeight;
        this.edgeText.textContent = String(intWeight);
    }

    public getStartVertex(): Vertex {
        return this.startVertex;
    }

    public getEndVertex(): Vertex {
        return this.endVertex;
    }
}
