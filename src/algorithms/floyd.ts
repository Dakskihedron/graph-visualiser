import Vertex from "../vertex.js";
import Edge from "../edge.js";

export default abstract class Floyd {
    private static inf = Number.MAX_VALUE;

    public static async printMatrix(matrix: number[][]) {
        for (const row of matrix) {
            const line = row.join(", ").replaceAll(String(this.inf), "\u221e");
            console.log(line);
        }
        console.log(" ");
    }

    public static async runAlgorithm(vertices: Vertex[]): Promise<void> {
        const sortedVertices = vertices.slice().sort((v, w) => v.getVertexValue() - w.getVertexValue());
        const distMatrix: number[][] = new Array(vertices.length)
            .fill(undefined)
            .map(() => Array(vertices.length).fill(this.inf));
        for (const v of vertices) {
            const edges: Edge[] = v.getEdges();
            for (const e of edges) {
                const u: number = e.getStartVertex().getVertexValue();
                const v: number = e.getEndVertex().getVertexValue();
                distMatrix[u][v] = e.getWeight();
            }

            for (let i = 0; i < vertices.length; i++) {
                for (let j = 0; j < vertices.length; j++) {
                    if (i == j) distMatrix[i][j] = 0;
                }
            }
        }

        console.log("Floyd's algorithm");

        for (let i = 0; i < sortedVertices.length; i++) {
            for (let j = 0; j < sortedVertices.length; j++) {
                for (let k = 0; k < sortedVertices.length; k++) {
                    const x = sortedVertices[i].getVertexValue();
                    const u = sortedVertices[j].getVertexValue();
                    const v = sortedVertices[k].getVertexValue();
                    distMatrix[u][v] = Math.min(distMatrix[u][v], distMatrix[u][x] + distMatrix[x][v]);
                }
            }
            console.log(`x = ${i}`);
            await this.printMatrix(distMatrix);
        }
    }
}
