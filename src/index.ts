import GraphNode from './graph-node.js';

enum EditorMode {
    AddElement = "addElement",
    RemoveElement = "removeElement"
}

enum GraphAlgorithm {
    BFS = "bfs",
    DFS = "dfs"
}

abstract class GraphEditor {
    private static _graphNodesList: GraphNode[] = new Array();
    private static _currentNodeValues: number[] = new Array();
    private static _editorSelectedMode: EditorMode = EditorMode.AddElement;
    private static readonly _graphEditorWindow: SVGGElement = document.getElementById("graphEditorWindow") as unknown as SVGGElement;

    private static _allowInteraction: boolean = true;
    private static _startNode: GraphNode | null = null;
    private static _awaitingEndNode: boolean = false;

    public static getNextNodeValue(): number | null {
        for (let n=0; n < 100; n++) {
            if (this._currentNodeValues.indexOf(n) == -1) return n;
        }
        return null;
    }

    public static convertMousePosToSVGPos(event: MouseEvent): { x: number, y: number } {
        const ctm = (this._graphEditorWindow).getScreenCTM();
        return { x: (event.clientX - ctm!.e) / ctm!.a, y: (event.clientY - ctm!.f) / ctm!.d };
    }

    public static async addNodeToGraph(x: number, y: number): Promise<boolean> {
        const nodeValue = this.getNextNodeValue();
        if (nodeValue == null) return false; 

        const newGraphNode = new GraphNode(nodeValue, x, y);
        this._graphNodesList.push(newGraphNode);
        this._currentNodeValues.push(nodeValue);
        return true;
    }
    
    public static async removeNodeFromGraph(node: HTMLElement): Promise<void> {
        const index = this._graphNodesList.map(node => node.getNodeValue()).indexOf(parseInt(node.id));
        const nodeObj = this._graphNodesList[index];

        nodeObj.getListOfEdges().slice().reverse().forEach(edge => this.removeEdgeFromGraph(edge));
        this._graphNodesList.filter(node => node.hasAdjacentNode(nodeObj)).forEach(node => node.removeAdjacentNode(nodeObj));

        nodeObj.destoryDOMElement();
        this._graphNodesList.splice(index, 1);
        this._currentNodeValues.splice(this._currentNodeValues.indexOf(parseInt(node.id)), 1);
    }

    public static async startAddEdgeToGraph(node: SVGGElement): Promise<void> {
        this._startNode = this._graphNodesList[this._graphNodesList.map(node => node.getNodeValue()).indexOf(parseInt(node.id))];
        this._awaitingEndNode = true;
        this._startNode.toggleSelected();
    }

    public static async finishAddEdgeToGraph(node: SVGGElement): Promise<void> {
        const nodeObj = this._graphNodesList[this._graphNodesList.map(node => node.getNodeValue()).indexOf(parseInt(node.id))];
        if (nodeObj == this._startNode) return;

        if (this._startNode!.hasAdjacentNode(nodeObj)) return;
        this._startNode!.addAdjacentNode(nodeObj);

        const newEdge = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const startCoord = this._startNode!.getNodeCoordinates();
        const endCoord = nodeObj.getNodeCoordinates();
        newEdge.setAttributeNS(null, "d", `M ${startCoord.x},${startCoord.y} L ${endCoord.x},${endCoord.y}`);
        newEdge.setAttributeNS(null, "stroke", "black");
        newEdge.setAttributeNS(null, "stroke-width", "3");
        newEdge.setAttributeNS(null, "fill", "none");
        newEdge.setAttributeNS(null, "marker-end", "url(#arrow)");
        
        this._startNode!.addEdge(newEdge);
        nodeObj.addEdge(newEdge);
        document.getElementById("graphEditorEdgesGroup")!.appendChild(newEdge);
    }

    public static async removeEdgeFromGraph(edge: SVGPathElement): Promise<void> {
        for (const node1 of this._graphNodesList.filter(node => node.hasEdge(edge))) {
            for (const node2 of this._graphNodesList.filter(node => node.hasEdge(edge))) {
                if (node1.hasAdjacentNode(node2)) node1.removeAdjacentNode(node2);
            }
        }
        this._graphNodesList.filter(node => node.hasEdge(edge)).forEach(node => node.removeEdge(edge));
        edge.remove();
    }

    public static async addElementToGraph(event: MouseEvent): Promise<void> {
        if (this._awaitingEndNode == true) {
            if (this._editorSelectedMode == EditorMode.AddElement) {
                const element = (event.target as HTMLElement).parentNode;
                if ((element instanceof SVGGElement) && (element.classList.contains("graph-node"))) {
                    await this.finishAddEdgeToGraph(element);
                }
            }
            this._startNode!.toggleSelected();
            this._startNode = null;
            this._awaitingEndNode = false;
        } else if (event.target == this._graphEditorWindow) {
            const coord = this.convertMousePosToSVGPos(event);
            const success = await this.addNodeToGraph(coord.x, coord.y);
            if (success == false) {
                alert("Reached node limit.");
            }
        } else {
            const element = (event.target as HTMLElement).parentNode;
            if ((element instanceof SVGGElement) && (element.classList.contains("graph-node"))) {
                await this.startAddEdgeToGraph(element);
            }
        }
    }

    public static async removeElementFromGraph(event: MouseEvent): Promise<void> {
        const selectedElement: HTMLElement = (event.target as HTMLElement).parentElement as HTMLElement;

        if (selectedElement.classList.contains("graph-node")) {
            this.removeNodeFromGraph(selectedElement);
        } else if (event.target instanceof SVGPathElement) {
            this.removeEdgeFromGraph(event.target);
        }
    }

    public static async editorInteractionEvent(event: MouseEvent): Promise<void> {
        if (this._allowInteraction == false) return;
        this._allowInteraction = false;

        if (this._awaitingEndNode == true) {
            await this.addElementToGraph(event);
            this._allowInteraction = true;
            return;
        }

        switch (this._editorSelectedMode) {
            case EditorMode.AddElement:
                    await this.addElementToGraph(event);
                break;
            case EditorMode.RemoveElement:
                    await this.removeElementFromGraph(event);
                break;
        }
        this._allowInteraction = true;
    }

    public static setEditorMode(selectedMode: EditorMode): void {
        this._editorSelectedMode = selectedMode;
    }

    public static setInteractionState(state: boolean): void {
        this._allowInteraction = state;
    }
}

abstract class GraphAlgorithmVisualiser {
    private static _graphSelectedAlgorithm: GraphAlgorithm = GraphAlgorithm.BFS;

    public static runAlgorithm(): void {
        GraphEditor.setInteractionState(false);

        console.log(`Running ${this._graphSelectedAlgorithm}...`);
        // Todo: implement algorithm running

        GraphEditor.setInteractionState(true);
    }

    public static setAlgorithm(algo: GraphAlgorithm): void {
        this._graphSelectedAlgorithm = algo;
    }
}

document.getElementById("graphEditorWindow")!.addEventListener("click", (event) => {
    GraphEditor.editorInteractionEvent(event);
}, false);

document.getElementById("graphEditorModeSelect")!.addEventListener("input", (event) => {
    GraphEditor.setEditorMode((event.target as HTMLInputElement).value as EditorMode);
}, false);

document.getElementById("graphAlgorithmSelect")!.addEventListener("input", (event) => {
    GraphAlgorithmVisualiser.setAlgorithm((event.target as HTMLInputElement).value as GraphAlgorithm);
}, false);

document.getElementById("graphAlgorithmRunButton")!.addEventListener("click", () => {
    GraphAlgorithmVisualiser.runAlgorithm();
}, false)