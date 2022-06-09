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
import { Stack, wait } from "../utils.js";
var DFS = /** @class */ (function () {
    function DFS() {
    }
    DFS.runAlgorithm = function (vertices) {
        return __awaiter(this, void 0, void 0, function () {
            function dfsRecursiveVisit(vertice) {
                return __awaiter(this, void 0, void 0, function () {
                    var s, _i, _a, neighbour;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                s = vertice.getVertexValue();
                                colour[s] = "grey";
                                vertice.setCircleColour("grey");
                                seen[s] = time++;
                                stack.push(s);
                                console.log("Stack: ".concat(stack));
                                console.log("Pred: ".concat(pred));
                                console.log("Seen: ".concat(seen));
                                console.log("Done: ".concat(done));
                                console.log(" ");
                                return [4 /*yield*/, wait()];
                            case 1:
                                _b.sent();
                                _i = 0, _a = vertice.getNeighbours().sort(function (v, w) { return v.getVertexValue() - w.getVertexValue(); });
                                _b.label = 2;
                            case 2:
                                if (!(_i < _a.length)) return [3 /*break*/, 5];
                                neighbour = _a[_i];
                                if (!(colour[neighbour.getVertexValue()] == "white")) return [3 /*break*/, 4];
                                pred[neighbour.getVertexValue()] = s;
                                return [4 /*yield*/, dfsRecursiveVisit(neighbour)];
                            case 3:
                                _b.sent();
                                _b.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 2];
                            case 5:
                                colour[s] = "black";
                                vertice.setCircleColour("black");
                                vertice.setTextColour("white");
                                done[s] = time++;
                                stack.pop();
                                console.log("Stack: ".concat(stack));
                                console.log("Pred: ".concat(pred));
                                console.log("Seen: ".concat(seen));
                                console.log("Done: ".concat(done));
                                console.log(" ");
                                return [4 /*yield*/, wait()];
                            case 6:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
            var sortedVertices, colour, pred, seen, done, stack, time, _i, sortedVertices_1, vertice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sortedVertices = vertices.sort(function (v, w) { return v.getVertexValue() - w.getVertexValue(); });
                        colour = new Array(sortedVertices.length).fill("white");
                        pred = new Array(sortedVertices.length).fill(-1);
                        seen = new Array(sortedVertices.length).fill(-1);
                        done = new Array(sortedVertices.length).fill(-1);
                        stack = new Stack();
                        time = 0;
                        console.log("Depth-first search");
                        console.log("Stack: ".concat(stack));
                        console.log("Pred: ".concat(pred));
                        console.log("Seen: ".concat(seen));
                        console.log("Done: ".concat(done));
                        console.log(" ");
                        _i = 0, sortedVertices_1 = sortedVertices;
                        _a.label = 1;
                    case 1:
                        if (!(_i < sortedVertices_1.length)) return [3 /*break*/, 5];
                        vertice = sortedVertices_1[_i];
                        if (!(colour[vertice.getVertexValue()] == "white")) return [3 /*break*/, 4];
                        return [4 /*yield*/, wait()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, dfsRecursiveVisit(vertice)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return DFS;
}());
export default DFS;
