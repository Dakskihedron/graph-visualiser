var Edge = /** @class */ (function () {
    function Edge(start, end, weight) {
        if (weight === void 0) { weight = 0; }
        this.startVertex = start;
        this.endVertex = end;
        this.weight = weight;
        this.edgeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.edgePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.edgeText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    }
    Edge.prototype.createDOMObject = function (mx, my, lx, ly) {
        var _this = this;
        this.edgeGroup.setAttributeNS(null, "class", "edge");
        this.edgeText.textContent = String(this.weight);
        var pathAttributes = {
            d: "M ".concat(mx, ",").concat(my, " L ").concat(lx, ",").concat(ly),
            stroke: "black",
            "stroke-width": "3",
            fill: "none",
            "marker-end": "url(#arrow)",
        };
        Object.keys(pathAttributes).forEach(function (attr) {
            _this.edgePath.setAttributeNS(null, attr, pathAttributes[attr]);
        });
        var sc = this.startVertex.getVertexCoords();
        var ec = this.endVertex.getVertexCoords();
        var midpoint = { x: (sc.x + ec.x) / 2, y: (sc.y + ec.y) / 2 };
        var slope = (ec.y - sc.y) / (ec.x - sc.x);
        var dy = Math.sqrt(Math.pow(14, 2) / (Math.pow(slope, 2) + 1));
        var dx = -slope * dy;
        var textAttributes = {
            x: String(midpoint.x + dx),
            y: String(midpoint.y + dy),
            dy: ".35em",
            stroke: "black",
            "stroke-width": "1",
            "font-size": "15px",
        };
        Object.keys(textAttributes).forEach(function (attr) {
            _this.edgeText.setAttributeNS(null, attr, textAttributes[attr]);
        });
        this.startVertex.addEdge(this);
        this.startVertex.addNeighbour(this.endVertex);
        this.endVertex.addEdge(this);
        this.edgeGroup.appendChild(this.edgePath);
        this.edgeGroup.appendChild(this.edgeText);
        document.getElementById("graphEdgesGroup").appendChild(this.edgeGroup);
    };
    Edge.prototype.destroyDOMObject = function () {
        this.startVertex.removeEdge(this);
        this.startVertex.removeNeighbour(this.endVertex);
        this.endVertex.removeEdge(this);
        this.edgeGroup.remove();
    };
    Edge.prototype.getDOMObject = function () {
        return this.edgeGroup;
    };
    Edge.prototype.getWeight = function () {
        return this.weight;
    };
    Edge.prototype.setWeight = function () {
        var weight = prompt("Set new weight:", String(this.weight));
        if (isNaN(weight)) {
            return alert("Not a number.");
        }
        this.weight = parseInt(weight);
        this.edgeText.textContent = String(parseInt(weight));
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
