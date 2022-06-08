var Edge = /** @class */ (function () {
    function Edge(start, end, weight) {
        if (weight === void 0) { weight = 0; }
        this.startVertex = start;
        this.endVertex = end;
        this.edge = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.weight = weight;
    }
    Edge.prototype.createDOMObject = function (mx, my, lx, ly) {
        var _this = this;
        var edgeAttributes = {
            class: "edge",
            d: "M ".concat(mx, ",").concat(my, " L ").concat(lx, ",").concat(ly),
            stroke: "black",
            "stroke-width": "3",
            fill: "none",
            "marker-end": "url(#arrow)",
        };
        Object.keys(edgeAttributes).forEach(function (attr) {
            _this.edge.setAttributeNS(null, attr, edgeAttributes[attr]);
        });
        this.startVertex.addEdge(this);
        this.startVertex.addNeighbour(this.endVertex);
        this.endVertex.addEdge(this);
        document.getElementById("graphEdgesGroup").appendChild(this.edge);
    };
    Edge.prototype.destroyDOMObject = function () {
        this.startVertex.removeEdge(this);
        this.startVertex.removeNeighbour(this.endVertex);
        this.endVertex.removeEdge(this);
        this.edge.remove();
    };
    Edge.prototype.getDOMObject = function () {
        return this.edge;
    };
    Edge.prototype.getWeight = function () {
        return this.weight;
    };
    Edge.prototype.setWeight = function (weight) {
        this.weight = weight;
    };
    Edge.prototype.getStartVertex = function () {
        return this.startVertex;
    };
    Edge.prototype.getEndVertex = function () {
        return this.endVertex;
    };
    return Edge;
}());
export default Edge;
