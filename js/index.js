var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import BFS from "./algorithms/bfs.js";
import DFS from "./algorithms/dfs.js";
import Edge from "./edge.js";
import Vertex from "./vertex.js";
var EditorMode;
(function (EditorMode) {
    EditorMode["AddElement"] = "addElement";
    EditorMode["RemoveElement"] = "removeElement";
})(EditorMode || (EditorMode = {}));
var AlgorithmSelection;
(function (AlgorithmSelection) {
    AlgorithmSelection["BFS"] = "bfs";
    AlgorithmSelection["DFS"] = "dfs";
})(AlgorithmSelection || (AlgorithmSelection = {}));
var GraphEditor = /** @class */ (function () {
    function GraphEditor() {
    }
    GraphEditor.getNextValue = function () {
        for (var n = 0; n < 100; n++) {
            if (this.reservedValues.indexOf(n) == -1)
                return n;
        }
    };
    GraphEditor.translatePos = function (event) {
        var ctm = this.graphEditor.getScreenCTM();
        return { x: (event.clientX - ctm.e) / ctm.a, y: (event.clientY - ctm.f) / ctm.d };
    };
    GraphEditor.getVertex = function (id) {
        var vertexId = parseInt(id);
        return this.vertices.find(function (v) { return v.getVertexValue() == vertexId; });
    };
    GraphEditor.getEdge = function (edge) {
        return this.edges.find(function (e) { return e.getDOMObject() == edge; });
    };
    GraphEditor.addVertex = function (x, y) {
        return __awaiter(this, void 0, void 0, function () {
            var value, newVertex;
            return __generator(this, function (_a) {
                value = this.getNextValue();
                if (value == undefined)
                    return [2 /*return*/, false];
                newVertex = new Vertex(value, x, y);
                newVertex.createDOMObject(x, y);
                this.vertices.push(newVertex);
                this.reservedValues.push(value);
                return [2 /*return*/, true];
            });
        });
    };
    GraphEditor.removeVertex = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            var vertex, vertexEdges;
            var _this = this;
            return __generator(this, function (_a) {
                vertex = this.getVertex(element.id);
                vertexEdges = vertex.getEdges().slice().reverse();
                vertex.destroyDOMObject();
                vertexEdges.forEach(function (e) { return _this.edges.splice(_this.edges.indexOf(e), 1); });
                this.vertices.splice(this.vertices.indexOf(vertex), 1);
                this.reservedValues.splice(this.reservedValues.indexOf(parseInt(element.id)), 1);
                return [2 /*return*/];
            });
        });
    };
    GraphEditor.addEdgeStart = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.selectedVertex = this.getVertex(element.id);
                this.drawingEdge = true;
                this.selectedVertex.toggleSelected();
                return [2 /*return*/];
            });
        });
    };
    GraphEditor.addEdgeEnd = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            var vertex, start, end, newEdge;
            return __generator(this, function (_a) {
                vertex = this.getVertex(element.id);
                if (vertex == this.selectedVertex || this.selectedVertex.hasNeighbour(vertex))
                    return [2 /*return*/];
                start = this.selectedVertex.getVertexCoords();
                end = vertex.getVertexCoords();
                newEdge = new Edge(this.selectedVertex, vertex);
                newEdge.createDOMObject(start.x, start.y, end.x, end.y);
                this.edges.push(newEdge);
                return [2 /*return*/];
            });
        });
    };
    GraphEditor.removeEdge = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var edge;
            return __generator(this, function (_a) {
                edge = this.getEdge(e);
                edge.destroyDOMObject();
                this.edges.splice(this.edges.indexOf(edge), 1);
                return [2 /*return*/];
            });
        });
    };
    GraphEditor.editorAddElement = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var element, coord, success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = event.target.parentElement;
                        if (!(this.drawingEdge == true)) return [3 /*break*/, 3];
                        if (!(this.selectedEditorMode == EditorMode.AddElement)) return [3 /*break*/, 2];
                        if (!(element instanceof SVGGElement && element.classList.contains("vertex"))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.addEdgeEnd(element)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.selectedVertex.toggleSelected();
                        this.selectedVertex = null;
                        this.drawingEdge = false;
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(element instanceof SVGGElement && element.classList.contains("vertex"))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.addEdgeStart(element)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        if (!(event.target == this.graphEditor)) return [3 /*break*/, 7];
                        coord = this.translatePos(event);
                        return [4 /*yield*/, this.addVertex(coord.x, coord.y)];
                    case 6:
                        success = _a.sent();
                        if (success == false)
                            alert("Vertex limit reached.");
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    GraphEditor.editorRemoveElement = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = event.target;
                        if (!(element instanceof SVGPathElement)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.removeEdge(element)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(element.parentElement instanceof SVGGElement && element.parentElement.classList.contains("vertex"))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.removeVertex(element.parentElement)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GraphEditor.editorEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.inProgress == true)
                            return [2 /*return*/];
                        this.inProgress = true;
                        if (!(this.drawingEdge == true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.editorAddElement(event)];
                    case 1:
                        _b.sent();
                        this.inProgress = false;
                        return [2 /*return*/];
                    case 2:
                        _a = this.selectedEditorMode;
                        switch (_a) {
                            case EditorMode.AddElement: return [3 /*break*/, 3];
                            case EditorMode.RemoveElement: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, this.editorAddElement(event)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.editorRemoveElement(event)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        this.inProgress = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    GraphEditor.setEditorMode = function (selectedMode) {
        this.selectedEditorMode = selectedMode;
    };
    GraphEditor.getProcessStatus = function () {
        return this.inProgress;
    };
    GraphEditor.setProcessStatus = function (state) {
        this.inProgress = state;
    };
    GraphEditor.getVertices = function () {
        return this.vertices;
    };
    GraphEditor.resetVertices = function () {
        if (this.inProgress == false) {
            this.vertices.forEach(function (v) {
                v.setCircleColour("white");
                v.setTextColour("black");
            });
        }
    };
    GraphEditor.editorClearAll = function () {
        if (this.inProgress == true)
            return;
        if (this.drawingEdge == true) {
            this.selectedVertex.toggleSelected();
            this.selectedVertex = null;
            this.drawingEdge = false;
        }
        if (confirm("Are you sure you want to clear all vertices and edges?") == true) {
            document.getElementById("graphEdgesGroup").replaceChildren();
            document.getElementById("graphVerticesGroup").replaceChildren();
            this.vertices = new Array();
            this.edges = new Array();
            this.reservedValues = new Array();
        }
    };
    GraphEditor.graphEditor = document.getElementById("editorWindow");
    GraphEditor.vertices = new Array();
    GraphEditor.edges = new Array();
    GraphEditor.reservedValues = new Array();
    GraphEditor.selectedEditorMode = EditorMode.AddElement;
    GraphEditor.inProgress = false;
    GraphEditor.selectedVertex = null;
    GraphEditor.drawingEdge = false;
    return GraphEditor;
}());
var GraphAlgorithmVisualiser = /** @class */ (function () {
    function GraphAlgorithmVisualiser() {
    }
    GraphAlgorithmVisualiser.runAlgorithm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (GraphEditor.getProcessStatus() == true)
                            return [2 /*return*/];
                        GraphEditor.setProcessStatus(true);
                        _a = this._graphSelectedAlgorithm;
                        switch (_a) {
                            case AlgorithmSelection.BFS: return [3 /*break*/, 1];
                            case AlgorithmSelection.DFS: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, BFS.runAlgorithm(GraphEditor.getVertices())];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, DFS.runAlgorithm(GraphEditor.getVertices())];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        GraphEditor.setProcessStatus(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    GraphAlgorithmVisualiser.setAlgorithm = function (algo) {
        this._graphSelectedAlgorithm = algo;
    };
    GraphAlgorithmVisualiser._graphSelectedAlgorithm = AlgorithmSelection.BFS;
    return GraphAlgorithmVisualiser;
}());
document.getElementById("editorWindow").addEventListener("click", function (event) {
    GraphEditor.editorEvent(event);
}, false);
document.getElementById("editorModeSelect").addEventListener("input", function (event) {
    GraphEditor.setEditorMode(event.target.value);
}, false);
document.getElementById("editorClearAll").addEventListener("click", function () {
    GraphEditor.editorClearAll();
}, false);
document.getElementById("algorithmSelect").addEventListener("input", function (event) {
    GraphAlgorithmVisualiser.setAlgorithm(event.target.value);
}, false);
document.getElementById("runAlgorithm").addEventListener("click", function () {
    GraphEditor.resetVertices();
    GraphAlgorithmVisualiser.runAlgorithm();
}, false);
document.getElementById("graphReset").addEventListener("click", function () {
    GraphEditor.resetVertices();
});
