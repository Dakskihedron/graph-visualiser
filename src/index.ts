import BFS from "./algorithms/bfs.js";
import DFS from "./algorithms/dfs.js";
import Vertex from "./vertex.js";

enum EditorMode {
    AddElement = "addElement",
    RemoveElement = "removeElement",
}

enum AlgorithmSelection {
    BFS = "bfs",
    DFS = "dfs",
}

abstract class GraphEditor {
    private static readonly graphEditor: SVGSVGElement = document.getElementById(
        "editorWindow"
    ) as unknown as SVGSVGElement;

    private static vertices: Vertex[] = new Array();
    private static reservedValues: number[] = new Array();
    private static selectedEditorMode: EditorMode = EditorMode.AddElement;

    private static inProgress: boolean = false;
    private static selectedVertex: Vertex | null = null;
    private static drawingEdge: boolean = false;

    public static getNextValue(): number | undefined {
        for (let n = 0; n < 100; n++) {
            if (this.reservedValues.indexOf(n) == -1) return n;
        }
    }

    public static translatePos(event: MouseEvent): { x: number; y: number } {
        const ctm = this.graphEditor.getScreenCTM();
        return { x: (event.clientX - ctm!.e) / ctm!.a, y: (event.clientY - ctm!.f) / ctm!.d };
    }

    public static getVertex(id: string): Vertex {
        const vertexId = parseInt(id);
        return this.vertices.find(v => v.getVertexValue() == vertexId)!;
    }

    public static async addVertex(x: number, y: number): Promise<boolean> {
        const value = this.getNextValue();
        if (value == undefined) return false;

        const newVertex = new Vertex(value, x, y);
        newVertex.createDOMObject(x, y);
        this.vertices.push(newVertex);
        this.reservedValues.push(value);
        return true;
    }

    public static async removeVertex(element: SVGGElement): Promise<void> {
        const vertex = this.getVertex(element.id);
        vertex
            .getEdges()
            .slice()
            .reverse()
            .forEach(edge => this.removeEdge(edge));
        this.vertices.filter(v => v.hasNeighbour(vertex)).forEach(v => v.removeNeighbour(vertex));
        vertex.destroyDOMObject();
        this.vertices.splice(this.vertices.indexOf(vertex), 1);
        this.reservedValues.splice(this.reservedValues.indexOf(parseInt(element.id)), 1);
    }

    public static async addEdgeStart(element: SVGGElement): Promise<void> {
        this.selectedVertex = this.getVertex(element.id);
        this.drawingEdge = true;
        this.selectedVertex.toggleSelected();
    }

    public static async addEdgeEnd(element: SVGGElement): Promise<void> {
        const vertex = this.getVertex(element.id);
        if (vertex == this.selectedVertex || this.selectedVertex!.hasNeighbour(vertex)) return;

        this.selectedVertex!.addNeighbour(vertex);

        const newEdge = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const startCoord = this.selectedVertex!.getVertexCoords();
        const endCoord = vertex.getVertexCoords();

        const edgeAttributes: { [key: string]: string } = {
            class: "edge",
            d: `M ${startCoord.x},${startCoord.y} L ${endCoord.x},${endCoord.y}`,
            stroke: "black",
            "stroke-width": "3",
            fill: "none",
            "marker-end": "url(#arrow)",
        };

        Object.keys(edgeAttributes).forEach(attr => {
            newEdge.setAttributeNS(null, attr, edgeAttributes[attr]);
        });

        this.selectedVertex!.addEdge(newEdge);
        vertex.addEdge(newEdge);
        document.getElementById("graphEdgesGroup")!.appendChild(newEdge);
    }

    public static async removeEdge(edge: SVGPathElement): Promise<void> {
        for (const v1 of this.vertices.filter(v => v.hasEdge(edge))) {
            for (const v2 of this.vertices.filter(v => v.hasEdge(edge))) {
                if (v1.hasNeighbour(v2)) v1.hasNeighbour(v2);
            }
        }
        this.vertices.filter(v => v.hasEdge(edge)).forEach(v => v.removeEdge(edge));
        edge.remove();
    }

    public static async editorAddElement(event: MouseEvent): Promise<void> {
        const element = (event.target as Element).parentElement;
        if (this.drawingEdge == true) {
            if (this.selectedEditorMode == EditorMode.AddElement) {
                if (element instanceof SVGGElement && element.classList.contains("vertex")) {
                    await this.addEdgeEnd(element);
                }
            }
            this.selectedVertex!.toggleSelected();
            this.selectedVertex = null;
            this.drawingEdge = false;
        } else if (element instanceof SVGGElement && element.classList.contains("vertex")) {
            await this.addEdgeStart(element);
        } else if (event.target == this.graphEditor) {
            const coord = this.translatePos(event);
            const success = await this.addVertex(coord.x, coord.y);
            if (success == false) alert("Vertex limit reached.");
        }
    }

    public static async editorRemoveElement(event: MouseEvent): Promise<void> {
        const element = event.target as Element;
        if (element instanceof SVGPathElement) {
            await this.removeEdge(element as SVGPathElement);
        } else if (element.parentElement instanceof SVGGElement && element.parentElement.classList.contains("vertex")) {
            await this.removeVertex(element.parentElement as SVGGElement);
        }
    }

    public static async editorEvent(event: MouseEvent): Promise<void> {
        if (this.inProgress == true) return;
        this.inProgress = true;

        if (this.drawingEdge == true) {
            await this.editorAddElement(event);
            this.inProgress = false;
            return;
        }

        switch (this.selectedEditorMode) {
            case EditorMode.AddElement:
                await this.editorAddElement(event);
                break;
            case EditorMode.RemoveElement:
                await this.editorRemoveElement(event);
                break;
        }

        this.inProgress = false;
    }

    public static setEditorMode(selectedMode: EditorMode): void {
        this.selectedEditorMode = selectedMode;
    }

    public static getProcessStatus(): boolean {
        return this.inProgress;
    }

    public static setProcessStatus(state: boolean): void {
        this.inProgress = state;
    }

    public static getVertices(): Vertex[] {
        return this.vertices;
    }

    public static resetVertices(): void {
        if (this.inProgress == false) {
            this.vertices.forEach(v => {
                v.setCircleColour("white");
                v.setTextColour("black");
            });
        }
    }

    public static editorClearAll(): void {
        if (this.inProgress == true) return;

        if (this.drawingEdge == true) {
            this.selectedVertex!.toggleSelected();
            this.selectedVertex = null;
            this.drawingEdge = false;
        }

        if (confirm("Are you sure you want to clear all vertices and edges?") == true) {
            document.getElementById("graphEdgesGroup")!.replaceChildren();
            document.getElementById("graphVerticesGroup")!.replaceChildren();
            this.vertices = new Array();
            this.reservedValues = new Array();
        }
    }
}

abstract class GraphAlgorithmVisualiser {
    private static _graphSelectedAlgorithm: AlgorithmSelection = AlgorithmSelection.BFS;

    public static async runAlgorithm(): Promise<void> {
        if (GraphEditor.getProcessStatus() == true) return;
        GraphEditor.setProcessStatus(true);

        switch (this._graphSelectedAlgorithm) {
            case AlgorithmSelection.BFS:
                await BFS.runAlgorithm(GraphEditor.getVertices());
                break;
            case AlgorithmSelection.DFS:
                await DFS.runAlgorithm(GraphEditor.getVertices());
                break;
        }

        GraphEditor.setProcessStatus(false);
    }

    public static setAlgorithm(algo: AlgorithmSelection): void {
        this._graphSelectedAlgorithm = algo;
    }
}

document.getElementById("editorWindow")!.addEventListener(
    "click",
    event => {
        GraphEditor.editorEvent(event);
    },
    false
);

document.getElementById("editorModeSelect")!.addEventListener(
    "input",
    event => {
        GraphEditor.setEditorMode((event.target as HTMLInputElement).value as EditorMode);
    },
    false
);

document.getElementById("editorClearAll")!.addEventListener(
    "click",
    () => {
        GraphEditor.editorClearAll();
    },
    false
);

document.getElementById("algorithmSelect")!.addEventListener(
    "input",
    event => {
        GraphAlgorithmVisualiser.setAlgorithm((event.target as HTMLInputElement).value as AlgorithmSelection);
    },
    false
);

document.getElementById("runAlgorithm")!.addEventListener(
    "click",
    () => {
        GraphEditor.resetVertices();
        GraphAlgorithmVisualiser.runAlgorithm();
    },
    false
);

document.getElementById("graphReset")!.addEventListener("click", () => {
    GraphEditor.resetVertices();
});
