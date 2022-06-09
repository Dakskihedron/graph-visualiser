import BFS from "./algorithms/bfs.js";
import DFS from "./algorithms/dfs.js";
import Floyd from "./algorithms/floyd.js";
import Edge from "./edge.js";
import Vertex from "./vertex.js";

enum EditorMode {
    AddElement = "addElement",
    RemoveElement = "removeElement",
}

enum AlgorithmSelection {
    BFS = "bfs",
    DFS = "dfs",
    Floyd = "floyd",
}

abstract class GraphEditor {
    private static readonly graphEditor: SVGSVGElement = document.getElementById(
        "editorWindow"
    ) as unknown as SVGSVGElement;

    private static vertices: Vertex[] = new Array();
    private static edges: Edge[] = new Array();
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

    public static getEdge(edge: SVGGElement): Edge {
        return this.edges.find(e => e.getDOMObject() == edge)!;
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
        const vertex: Vertex = this.getVertex(element.id);
        const vertexEdges: Edge[] = vertex.getEdges().slice().reverse();
        vertex.destroyDOMObject();
        vertexEdges.forEach(e => this.edges.splice(this.edges.indexOf(e), 1));
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

        const start = this.selectedVertex!.getVertexCoords();
        const end = vertex.getVertexCoords();

        const newEdge = new Edge(this.selectedVertex!, vertex);
        newEdge.createDOMObject(start.x, start.y, end.x, end.y);
        this.edges.push(newEdge);
    }

    public static async removeEdge(element: SVGGElement): Promise<void> {
        const edge: Edge = this.getEdge(element);
        edge.destroyDOMObject();
        this.edges.splice(this.edges.indexOf(edge), 1);
    }

    public static async editorAddElement(event: MouseEvent): Promise<void> {
        const element: HTMLElement = (event.target as HTMLElement).parentElement as HTMLElement;
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
        } else if (element instanceof SVGGElement && element.classList.contains("edge")) {
            this.getEdge(element).setWeight();
        } else if (event.target == this.graphEditor) {
            const coord = this.translatePos(event);
            const success = await this.addVertex(coord.x, coord.y);
            if (success == false) alert("Vertex limit reached.");
        }
    }

    public static async editorRemoveElement(event: MouseEvent): Promise<void> {
        const element: HTMLElement = (event.target as HTMLElement).parentElement as HTMLElement;
        if (element instanceof SVGGElement && element.classList.contains("vertex")) {
            await this.removeVertex(element as SVGGElement);
        } else if (element instanceof SVGGElement && element.classList.contains("edge")) {
            await this.removeEdge(element as SVGGElement);
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
            this.edges = new Array();
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
            case AlgorithmSelection.Floyd:
                await Floyd.runAlgorithm(GraphEditor.getVertices());
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
