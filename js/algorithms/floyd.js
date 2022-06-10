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
var Floyd = /** @class */ (function () {
    function Floyd() {
    }
    Floyd.printMatrix = function (matrix) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, matrix_1, row, line;
            return __generator(this, function (_a) {
                for (_i = 0, matrix_1 = matrix; _i < matrix_1.length; _i++) {
                    row = matrix_1[_i];
                    line = row.join(", ").replaceAll(String(this.inf), "\u221e");
                    console.log(line);
                }
                console.log(" ");
                return [2 /*return*/];
            });
        });
    };
    Floyd.runAlgorithm = function (vertices) {
        return __awaiter(this, void 0, void 0, function () {
            var sortedVertices, distMatrix, _i, vertices_1, v, edges, _a, edges_1, e, u, v_1, i, j, i, j, k, x, u, v;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sortedVertices = vertices.slice().sort(function (v, w) { return v.getVertexValue() - w.getVertexValue(); });
                        distMatrix = new Array(vertices.length)
                            .fill(undefined)
                            .map(function () { return Array(vertices.length).fill(_this.inf); });
                        for (_i = 0, vertices_1 = vertices; _i < vertices_1.length; _i++) {
                            v = vertices_1[_i];
                            edges = v.getEdges();
                            for (_a = 0, edges_1 = edges; _a < edges_1.length; _a++) {
                                e = edges_1[_a];
                                u = e.getStartVertex().getVertexValue();
                                v_1 = e.getEndVertex().getVertexValue();
                                distMatrix[u][v_1] = e.getWeight();
                            }
                            for (i = 0; i < vertices.length; i++) {
                                for (j = 0; j < vertices.length; j++) {
                                    if (i == j)
                                        distMatrix[i][j] = 0;
                                }
                            }
                        }
                        console.log("Floyd's algorithm");
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < sortedVertices.length)) return [3 /*break*/, 4];
                        for (j = 0; j < sortedVertices.length; j++) {
                            for (k = 0; k < sortedVertices.length; k++) {
                                x = sortedVertices[i].getVertexValue();
                                u = sortedVertices[j].getVertexValue();
                                v = sortedVertices[k].getVertexValue();
                                distMatrix[u][v] = Math.min(distMatrix[u][v], distMatrix[u][x] + distMatrix[x][v]);
                            }
                        }
                        console.log("x = ".concat(i));
                        return [4 /*yield*/, this.printMatrix(distMatrix)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Floyd.inf = Number.MAX_VALUE;
    return Floyd;
}());
export default Floyd;
