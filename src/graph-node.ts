export default class GraphNode {
    private _adjacentNodeList: GraphNode[] = new Array();
    private _edgesList: SVGPathElement[] = new Array();
    private _nodeValue: number;
    private _element: SVGGElement;
    private _x: number;
    private _y: number;

    public constructor(nv: number, x: number, y: number) {
        this._nodeValue = nv;
        this._x = x;
        this._y = y;
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.createDOMElement(x, y);
    }

    public createDOMElement(x: number, y: number): void {
        const elementCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const elementText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const text = document.createTextNode(String(this._nodeValue));

        this._element.setAttributeNS(null, "class", "graph-node");
        this._element.setAttributeNS(null, "id", String(this._nodeValue));

        elementCircle.setAttributeNS(null, "cx", String(x));
        elementCircle.setAttributeNS(null, "cy", String(y));
        elementCircle.setAttributeNS(null, "r", "25");
        elementCircle.setAttributeNS(null, "fill", "white");
        elementCircle.setAttributeNS(null, "stroke", "black");
        elementCircle.setAttributeNS(null, "stroke-width", "3");

        elementText.setAttributeNS(null, "x", String(x));
        elementText.setAttributeNS(null, "y", String(y));
        elementText.setAttributeNS(null, "dy", ".35em");
        elementText.setAttributeNS(null, "text-anchor", "middle");
        elementText.setAttributeNS(null, "font-size", "20px");
        elementText.setAttributeNS(null, "stroke", "black");

        elementText.appendChild(text);
        this._element.appendChild(elementCircle);
        this._element.appendChild(elementText);
        document.getElementById("graphEditorNodesGroup")!.appendChild(this._element);
    }

    public destoryDOMElement(): void {
        this._element.remove();
    }

    public addAdjacentNode(node: GraphNode): void {
        this._adjacentNodeList.push(node);
    }

    public removeAdjacentNode(node: GraphNode): void {
        this._adjacentNodeList.splice(this._adjacentNodeList.indexOf(node), 1);
    }

    public hasAdjacentNode(node: GraphNode): boolean {
        if (this._adjacentNodeList.indexOf(node) == -1) return false;
        return true;
    }

    public addEdge(edge: SVGPathElement): void {
        this._edgesList.push(edge);
    }

    public removeEdge(edge: SVGPathElement): void {
        this._edgesList.splice(this._edgesList.indexOf(edge), 1);
    }

    public hasEdge(edge: SVGPathElement): boolean {
        if (this._edgesList.indexOf(edge) == -1) return false;
        return true;
    }

    public getListOfEdges(): SVGPathElement[] {
        return this._edgesList;
    }

    public getNodeValue(): number {
        return this._nodeValue;
    }

    public getNodeCoordinates(): { x: number, y: number} {
        return { x: this._x, y: this._y };
    }

    public toggleSelected(): void {
        const circle = this._element.firstChild as SVGCircleElement;
        if (circle.getAttributeNS(null, "fill") == "white") {
            circle.setAttributeNS(null, "fill", "#d6e9ff");
        } else {
            circle.setAttributeNS(null, "fill", "white");
        }
    }
}