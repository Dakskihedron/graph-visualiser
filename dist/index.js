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
import GraphNode from './graph-node.js';
var EditorMode;
(function (EditorMode) {
    EditorMode["AddElement"] = "addElement";
    EditorMode["RemoveElement"] = "removeElement";
})(EditorMode || (EditorMode = {}));
var GraphAlgorithm;
(function (GraphAlgorithm) {
    GraphAlgorithm["BFS"] = "bfs";
    GraphAlgorithm["DFS"] = "dfs";
})(GraphAlgorithm || (GraphAlgorithm = {}));
var GraphEditor = /** @class */ (function () {
    function GraphEditor() {
    }
    GraphEditor.getNextNodeValue = function () {
        for (var n = 0; n < 100; n++) {
            if (this._currentNodeValues.indexOf(n) == -1)
                return n;
        }
        return null;
    };
    GraphEditor.convertMousePosToSVGPos = function (event) {
        var ctm = (this._graphEditorWindow).getScreenCTM();
        return { x: (event.clientX - ctm.e) / ctm.a, y: (event.clientY - ctm.f) / ctm.d };
    };
    GraphEditor.addNodeToGraph = function (x, y) {
        return __awaiter(this, void 0, void 0, function () {
            var nodeValue, newGraphNode;
            return __generator(this, function (_a) {
                nodeValue = this.getNextNodeValue();
                if (nodeValue == null)
                    return [2 /*return*/, false];
                newGraphNode = new GraphNode(nodeValue, x, y);
                this._graphNodesList.push(newGraphNode);
                this._currentNodeValues.push(nodeValue);
                return [2 /*return*/, true];
            });
        });
    };
    GraphEditor.removeNodeFromGraph = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var index, nodeObj;
            var _this = this;
            return __generator(this, function (_a) {
                index = this._graphNodesList.map(function (node) { return node.getNodeValue(); }).indexOf(parseInt(node.id));
                nodeObj = this._graphNodesList[index];
                nodeObj.getListOfEdges().slice().reverse().forEach(function (edge) { return _this.removeEdgeFromGraph(edge); });
                this._graphNodesList.filter(function (node) { return node.hasAdjacentNode(nodeObj); }).forEach(function (node) { return node.removeAdjacentNode(nodeObj); });
                nodeObj.destoryDOMElement();
                this._graphNodesList.splice(index, 1);
                this._currentNodeValues.splice(this._currentNodeValues.indexOf(parseInt(node.id)), 1);
                return [2 /*return*/];
            });
        });
    };
    GraphEditor.startAddEdgeToGraph = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._startNode = this._graphNodesList[this._graphNodesList.map(function (node) { return node.getNodeValue(); }).indexOf(parseInt(node.id))];
                this._awaitingEndNode = true;
                this._startNode.toggleSelected();
                return [2 /*return*/];
            });
        });
    };
    GraphEditor.finishAddEdgeToGraph = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var nodeObj, newEdge, startCoord, endCoord;
            return __generator(this, function (_a) {
                nodeObj = this._graphNodesList[this._graphNodesList.map(function (node) { return node.getNodeValue(); }).indexOf(parseInt(node.id))];
                if (nodeObj == this._startNode)
                    return [2 /*return*/];
                if (this._startNode.hasAdjacentNode(nodeObj))
                    return [2 /*return*/];
                this._startNode.addAdjacentNode(nodeObj);
                newEdge = document.createElementNS("http://www.w3.org/2000/svg", "path");
                startCoord = this._startNode.getNodeCoordinates();
                endCoord = nodeObj.getNodeCoordinates();
                newEdge.setAttributeNS(null, "d", "M ".concat(startCoord.x, ",").concat(startCoord.y, " L ").concat(endCoord.x, ",").concat(endCoord.y));
                newEdge.setAttributeNS(null, "stroke", "black");
                newEdge.setAttributeNS(null, "stroke-width", "3");
                newEdge.setAttributeNS(null, "fill", "none");
                newEdge.setAttributeNS(null, "marker-end", "url(#arrow)");
                this._startNode.addEdge(newEdge);
                nodeObj.addEdge(newEdge);
                document.getElementById("graphEditorEdgesGroup").appendChild(newEdge);
                return [2 /*return*/];
            });
        });
    };
    GraphEditor.removeEdgeFromGraph = function (edge) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, node1, _b, _c, node2;
            return __generator(this, function (_d) {
                for (_i = 0, _a = this._graphNodesList.filter(function (node) { return node.hasEdge(edge); }); _i < _a.length; _i++) {
                    node1 = _a[_i];
                    for (_b = 0, _c = this._graphNodesList.filter(function (node) { return node.hasEdge(edge); }); _b < _c.length; _b++) {
                        node2 = _c[_b];
                        if (node1.hasAdjacentNode(node2))
                            node1.removeAdjacentNode(node2);
                    }
                }
                this._graphNodesList.filter(function (node) { return node.hasEdge(edge); }).forEach(function (node) { return node.removeEdge(edge); });
                edge.remove();
                return [2 /*return*/];
            });
        });
    };
    GraphEditor.addElementToGraph = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var element, coord, success, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._awaitingEndNode == true)) return [3 /*break*/, 3];
                        if (!(this._editorSelectedMode == EditorMode.AddElement)) return [3 /*break*/, 2];
                        element = event.target.parentNode;
                        if (!((element instanceof SVGGElement) && (element.classList.contains("graph-node")))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.finishAddEdgeToGraph(element)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this._startNode.toggleSelected();
                        this._startNode = null;
                        this._awaitingEndNode = false;
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(event.target == this._graphEditorWindow)) return [3 /*break*/, 5];
                        coord = this.convertMousePosToSVGPos(event);
                        return [4 /*yield*/, this.addNodeToGraph(coord.x, coord.y)];
                    case 4:
                        success = _a.sent();
                        if (success == false) {
                            alert("Reached node limit.");
                        }
                        return [3 /*break*/, 7];
                    case 5:
                        element = event.target.parentNode;
                        if (!((element instanceof SVGGElement) && (element.classList.contains("graph-node")))) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.startAddEdgeToGraph(element)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    GraphEditor.removeElementFromGraph = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedElement;
            return __generator(this, function (_a) {
                selectedElement = event.target.parentElement;
                if (selectedElement.classList.contains("graph-node")) {
                    this.removeNodeFromGraph(selectedElement);
                }
                else if (event.target instanceof SVGPathElement) {
                    this.removeEdgeFromGraph(event.target);
                }
                return [2 /*return*/];
            });
        });
    };
    GraphEditor.editorInteractionEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this._allowInteraction == false)
                            return [2 /*return*/];
                        this._allowInteraction = false;
                        if (!(this._awaitingEndNode == true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.addElementToGraph(event)];
                    case 1:
                        _b.sent();
                        this._allowInteraction = true;
                        return [2 /*return*/];
                    case 2:
                        _a = this._editorSelectedMode;
                        switch (_a) {
                            case EditorMode.AddElement: return [3 /*break*/, 3];
                            case EditorMode.RemoveElement: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, this.addElementToGraph(event)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.removeElementFromGraph(event)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        this._allowInteraction = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    GraphEditor.setEditorMode = function (selectedMode) {
        this._editorSelectedMode = selectedMode;
    };
    GraphEditor.setInteractionState = function (state) {
        this._allowInteraction = state;
    };
    GraphEditor._graphNodesList = new Array();
    GraphEditor._currentNodeValues = new Array();
    GraphEditor._editorSelectedMode = EditorMode.AddElement;
    GraphEditor._graphEditorWindow = document.getElementById("graphEditorWindow");
    GraphEditor._allowInteraction = true;
    GraphEditor._startNode = null;
    GraphEditor._awaitingEndNode = false;
    return GraphEditor;
}());
var GraphAlgorithmVisualiser = /** @class */ (function () {
    function GraphAlgorithmVisualiser() {
    }
    GraphAlgorithmVisualiser.runAlgorithm = function () {
        GraphEditor.setInteractionState(false);
        alert("Coming soon!");
        // Todo: implement algorithm running
        GraphEditor.setInteractionState(true);
    };
    GraphAlgorithmVisualiser.setAlgorithm = function (algo) {
        this._graphSelectedAlgorithm = algo;
    };
    GraphAlgorithmVisualiser._graphSelectedAlgorithm = GraphAlgorithm.BFS;
    return GraphAlgorithmVisualiser;
}());
document.getElementById("graphEditorWindow").addEventListener("click", function (event) {
    GraphEditor.editorInteractionEvent(event);
}, false);
document.getElementById("graphEditorModeSelect").addEventListener("input", function (event) {
    GraphEditor.setEditorMode(event.target.value);
}, false);
document.getElementById("graphAlgorithmSelect").addEventListener("input", function (event) {
    GraphAlgorithmVisualiser.setAlgorithm(event.target.value);
}, false);
document.getElementById("graphAlgorithmRunButton").addEventListener("click", function () {
    GraphAlgorithmVisualiser.runAlgorithm();
}, false);
