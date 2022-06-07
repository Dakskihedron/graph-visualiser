var GraphNode = /** @class */ (function () {
    function GraphNode(nv, x, y) {
        this._adjacentNodeList = new Array();
        this._edgesList = new Array();
        this._nodeValue = nv;
        this._x = x;
        this._y = y;
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.createDOMElement(x, y);
    }
    GraphNode.prototype.createDOMElement = function (x, y) {
        var elementCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        var elementText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        var text = document.createTextNode(String(this._nodeValue));
        this._element.setAttributeNS(null, "class", "graph-node");
        this._element.setAttributeNS(null, "id", String(this._nodeValue));
        elementCircle.setAttributeNS(null, "cx", String(x));
        elementCircle.setAttributeNS(null, "cy", String(y));
        elementCircle.setAttributeNS(null, "r", "25");
        elementCircle.setAttributeNS(null, "fill", "white");
        elementCircle.setAttributeNS(null, "stroke", "black");
        elementCircle.setAttributeNS(null, "stroke-width", "3");
        elementText.setAttributeNS(null, "x", String(x));
        elementText.setAttributeNS(null, "y", String(y));
        elementText.setAttributeNS(null, "dy", ".35em");
        elementText.setAttributeNS(null, "text-anchor", "middle");
        elementText.setAttributeNS(null, "font-size", "20px");
        elementText.setAttributeNS(null, "stroke", "black");
        elementText.setAttributeNS(null, "fill", "black");
        elementText.appendChild(text);
        this._element.appendChild(elementCircle);
        this._element.appendChild(elementText);
        document.getElementById("graphEditorNodesGroup").appendChild(this._element);
    };
    GraphNode.prototype.destoryDOMElement = function () {
        this._element.remove();
    };
    GraphNode.prototype.addAdjacentNode = function (node) {
        this._adjacentNodeList.push(node);
    };
    GraphNode.prototype.removeAdjacentNode = function (node) {
        this._adjacentNodeList.splice(this._adjacentNodeList.indexOf(node), 1);
    };
    GraphNode.prototype.hasAdjacentNode = function (node) {
        if (this._adjacentNodeList.indexOf(node) == -1)
            return false;
        return true;
    };
    GraphNode.prototype.addEdge = function (edge) {
        this._edgesList.push(edge);
    };
    GraphNode.prototype.removeEdge = function (edge) {
        this._edgesList.splice(this._edgesList.indexOf(edge), 1);
    };
    GraphNode.prototype.hasEdge = function (edge) {
        if (this._edgesList.indexOf(edge) == -1)
            return false;
        return true;
    };
    GraphNode.prototype.getListOfNeighbours = function () {
        return this._adjacentNodeList;
    };
    GraphNode.prototype.getListOfEdges = function () {
        return this._edgesList;
    };
    GraphNode.prototype.getNodeValue = function () {
        return this._nodeValue;
    };
    GraphNode.prototype.getNodeCoordinates = function () {
        return { x: this._x, y: this._y };
    };
    GraphNode.prototype.toggleSelected = function () {
        var circle = this._element.firstChild;
        if (circle.getAttributeNS(null, "fill") == "white") {
            circle.setAttributeNS(null, "fill", "#d6e9ff");
        }
        else {
            circle.setAttributeNS(null, "fill", "white");
        }
    };
    GraphNode.prototype.getNodeColour = function () {
        var circle = this._element.firstChild;
        return circle.getAttributeNS(null, "fill");
    };
    GraphNode.prototype.setNodeColour = function (colour) {
        var circle = this._element.firstChild;
        circle.setAttributeNS(null, "fill", colour);
    };
    GraphNode.prototype.setTextColour = function (colour) {
        var text = this._element.lastChild;
        text.setAttributeNS(null, "stroke", colour);
        text.setAttributeNS(null, "fill", colour);
    };
    return GraphNode;
}());
export default GraphNode;
