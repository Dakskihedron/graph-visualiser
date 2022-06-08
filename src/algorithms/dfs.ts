import Vertex from "../vertex.js";
import { wait } from "../utils.js";

export default abstract class DFS {
    public static async runAlgorithm(vertices: Vertex[]): Promise<void> {
        const sortedVertices = vertices.sort((v, w) => v.getVertexValue() - w.getVertexValue());
        const colour: string[] = new Array(sortedVertices.length).fill("white");
        const pred: number[] = new Array(sortedVertices.length).fill(null);
        const seen: number[] = new Array(sortedVertices.length).fill(null);
        const done: number[] = new Array(sortedVertices.length).fill(null);
        let time = 0;

        async function dfsRecursiveVisit(vertice: Vertex) {
            const s = vertice.getVertexValue();
            colour[s] = "grey";
            vertice.setCircleColour("grey");
            seen[s] = time++;

            await wait();

            for (const neighbour of vertice.getNeighbours().sort((v, w) => v.getVertexValue() - w.getVertexValue())) {
                if (colour[neighbour.getVertexValue()] == "white") {
                    pred[neighbour.getVertexValue()] = s;
                    await dfsRecursiveVisit(neighbour);
                }
            }

            colour[s] = "black";
            vertice.setCircleColour("black");
            vertice.setTextColour("white");
            done[s] = time++;

            await wait();
        }

        for (const vertice of sortedVertices) {
            if (colour[vertice.getVertexValue()] == "white") {
                await wait();
                await dfsRecursiveVisit(vertice);
            }
        }

        console.log(pred);
        console.log(seen);
        console.log(done);
    }
}
