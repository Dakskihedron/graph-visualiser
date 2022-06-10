import Vertex from "../vertex.js";
import { Stack, wait } from "../utils.js";

export default abstract class DFS {
    public static async runAlgorithm(vertices: Vertex[]): Promise<void> {
        const sortedVertices = vertices.slice().sort((v, w) => v.getVertexValue() - w.getVertexValue());
        const colour: string[] = new Array(sortedVertices.length).fill("white");
        const pred: number[] = new Array(sortedVertices.length).fill(-1);
        const seen: number[] = new Array(sortedVertices.length).fill(-1);
        const done: number[] = new Array(sortedVertices.length).fill(-1);
        const stack = new Stack<number>();
        let time = 0;

        console.log("Depth-first search");

        console.log(`Stack: ${stack}`);
        console.log(`Pred: ${pred}`);
        console.log(`Seen: ${seen}`);
        console.log(`Done: ${done}`);
        console.log(" ");

        async function dfsRecursiveVisit(vertice: Vertex) {
            const s = vertice.getVertexValue();
            colour[s] = "grey";
            vertice.setCircleColour("grey");
            seen[s] = time++;

            stack.push(s);

            console.log(`Stack: ${stack}`);
            console.log(`Pred: ${pred}`);
            console.log(`Seen: ${seen}`);
            console.log(`Done: ${done}`);
            console.log(" ");

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

            stack.pop();

            console.log(`Stack: ${stack}`);
            console.log(`Pred: ${pred}`);
            console.log(`Seen: ${seen}`);
            console.log(`Done: ${done}`);
            console.log(" ");

            await wait();
        }

        for (const vertice of sortedVertices) {
            if (colour[vertice.getVertexValue()] == "white") {
                await wait();
                await dfsRecursiveVisit(vertice);
            }
        }
    }
}
