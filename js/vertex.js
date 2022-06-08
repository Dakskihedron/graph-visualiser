var Vertex = /** @class */ (function () {
    function Vertex(value, x, y) {
        this.neighbours = new Array();
        this.edges = new Array();
        this.value = value;
        this.x = x;
        this.y = y;
        this.vertexGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.vertexCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.vertexText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    }
    Vertex.prototype.createDOMObject = function (x, y) {
        var _this = this;
        this.vertexGroup.setAttributeNS(null, "id", String(this.value));
        this.vertexGroup.setAttributeNS(null, "class", "vertex");
        this.vertexText.textContent = String(this.value);
        var circleAttributes = {
            cx: String(x),
            cy: String(y),
            r: "25",
            fill: "white",
            stroke: "black",
            "stroke-width": "3",
        };
        var textAttributes = {
            x: String(x),
            y: String(y),
            dy: ".35em",
            fill: "black",
            stroke: "black",
            "font-size": "20px",
            "text-anchor": "middle",
        };
        Object.keys(circleAttributes).forEach(function (attr) {
            _this.vertexCircle.setAttributeNS(null, attr, circleAttributes[attr]);
        });
        Object.keys(textAttributes).forEach(function (attr) {
            _this.vertexText.setAttributeNS(null, attr, textAttributes[attr]);
        });
        this.vertexGroup.appendChild(this.vertexCircle);
        this.vertexGroup.appendChild(this.vertexText);
        document.getElementById("graphVerticesGroup").appendChild(this.vertexGroup);
    };
    Vertex.prototype.destroyDOMObject = function () {
        this.edges
            .slice()
            .reverse()
            .forEach(function (edge) { return edge.destroyDOMObject(); });
        this.vertexGroup.remove();
    };
    Vertex.prototype.addNeighbour = function (vertex) {
        this.neighbours.push(vertex);
    };
    Vertex.prototype.removeNeighbour = function (vertex) {
        this.neighbours.splice(this.neighbours.indexOf(vertex), 1);
    };
    Vertex.prototype.hasNeighbour = function (vertex) {
        if (this.neighbours.indexOf(vertex) == -1)
            return false;
        return true;
    };
    Vertex.prototype.getNeighbours = function () {
        return this.neighbours;
    };
    Vertex.prototype.addEdge = function (edge) {
        this.edges.push(edge);
    };
    Vertex.prototype.removeEdge = function (edge) {
        this.edges.splice(this.edges.indexOf(edge), 1);
    };
    Vertex.prototype.hasEdge = function (edge) {
        if (this.edges.indexOf(edge) == -1)
            return false;
        return true;
    };
    Vertex.prototype.getEdges = function () {
        return this.edges;
    };
    Vertex.prototype.getVertexValue = function () {
        return this.value;
    };
    Vertex.prototype.getVertexCoords = function () {
        return { x: this.x, y: this.y };
    };
    Vertex.prototype.toggleSelected = function () {
        if (this.vertexCircle.getAttributeNS(null, "fill") == "white") {
            this.vertexCircle.setAttributeNS(null, "fill", "#d6e9ff");
        }
        else {
            this.vertexCircle.setAttributeNS(null, "fill", "white");
        }
    };
    Vertex.prototype.getCircleColour = function () {
        return this.vertexCircle.getAttributeNS(null, "fill");
    };
    Vertex.prototype.setCircleColour = function (colour) {
        this.vertexCircle.setAttributeNS(null, "fill", colour);
    };
    Vertex.prototype.setTextColour = function (colour) {
        this.vertexText.setAttributeNS(null, "stroke", colour);
        this.vertexText.setAttributeNS(null, "fill", colour);
    };
    return Vertex;
}());
export default Vertex;
