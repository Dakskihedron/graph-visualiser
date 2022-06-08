import Edge from "./edge.js";

export default class Vertex {
    private neighbours: Vertex[] = new Array();
    private edges: Edge[] = new Array();
    private value: number;
    private x: number;
    private y: number;

    private vertexGroup: SVGGElement;
    private vertexCircle: SVGCircleElement;
    private vertexText: SVGTextElement;

    public constructor(value: number, x: number, y: number) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.vertexGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.vertexCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.vertexText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    }

    public createDOMObject(x: number, y: number): void {
        this.vertexGroup.setAttributeNS(null, "id", String(this.value));
        this.vertexGroup.setAttributeNS(null, "class", "vertex");
        this.vertexText.textContent = String(this.value);

        const circleAttributes: { [key: string]: string } = {
            cx: String(x),
            cy: String(y),
            r: "25",
            fill: "white",
            stroke: "black",
            "stroke-width": "3",
        };

        const textAttributes: { [key: string]: string } = {
            x: String(x),
            y: String(y),
            dy: ".35em",
            fill: "black",
            stroke: "black",
            "font-size": "20px",
            "text-anchor": "middle",
        };

        Object.keys(circleAttributes).forEach(attr => {
            this.vertexCircle.setAttributeNS(null, attr, circleAttributes[attr]);
        });

        Object.keys(textAttributes).forEach(attr => {
            this.vertexText.setAttributeNS(null, attr, textAttributes[attr]);
        });

        this.vertexGroup.appendChild(this.vertexCircle);
        this.vertexGroup.appendChild(this.vertexText);
        document.getElementById("graphVerticesGroup")!.appendChild(this.vertexGroup);
    }

    public destroyDOMObject(): void {
        this.edges
            .slice()
            .reverse()
            .forEach(edge => edge.destroyDOMObject());
        this.vertexGroup.remove();
    }

    public addNeighbour(vertex: Vertex): void {
        this.neighbours.push(vertex);
    }

    public removeNeighbour(vertex: Vertex): void {
        this.neighbours.splice(this.neighbours.indexOf(vertex), 1);
    }

    public hasNeighbour(vertex: Vertex): boolean {
        if (this.neighbours.indexOf(vertex) == -1) return false;
        return true;
    }

    public getNeighbours(): Vertex[] {
        return this.neighbours;
    }

    public addEdge(edge: Edge): void {
        this.edges.push(edge);
    }

    public removeEdge(edge: Edge): void {
        this.edges.splice(this.edges.indexOf(edge), 1);
    }

    public hasEdge(edge: Edge): boolean {
        if (this.edges.indexOf(edge) == -1) return false;
        return true;
    }

    public getEdges(): Edge[] {
        return this.edges;
    }

    public getVertexValue(): number {
        return this.value;
    }

    public getVertexCoords(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }

    public toggleSelected(): void {
        if (this.vertexCircle.getAttributeNS(null, "fill") == "white") {
            this.vertexCircle.setAttributeNS(null, "fill", "#d6e9ff");
        } else {
            this.vertexCircle.setAttributeNS(null, "fill", "white");
        }
    }

    public getCircleColour(): string {
        return this.vertexCircle.getAttributeNS(null, "fill")!;
    }

    public setCircleColour(colour: string): void {
        this.vertexCircle.setAttributeNS(null, "fill", colour);
    }

    public setTextColour(colour: string): void {
        this.vertexText.setAttributeNS(null, "stroke", colour);
        this.vertexText.setAttributeNS(null, "fill", colour);
    }
}
