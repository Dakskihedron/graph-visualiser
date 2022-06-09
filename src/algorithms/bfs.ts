import Vertex from "../vertex.js";
import { wait, Queue } from "../utils.js";

export default abstract class BFS {
    public static async runAlgorithm(vertices: Vertex[]): Promise<void> {
        const sortedVertices = vertices.sort((v, w) => v.getVertexValue() - w.getVertexValue());
        const colour: string[] = new Array(sortedVertices.length).fill("white");
        const pred: number[] = new Array(sortedVertices.length).fill(-1);
        const done: number[] = new Array(sortedVertices.length).fill(-1);
        const queue = new Queue<Vertex>();
        const valueQueue = new Queue<number>();

        console.log("Breadth-first search");

        console.log(`Queue: ${valueQueue}`);
        console.log(`Pred: ${pred}`);
        console.log(`Done: ${done}`);
        console.log(" ");

        async function bfsVisit(vertice: Vertex) {
            const s = vertice.getVertexValue();
            colour[s] = "grey";
            vertice.setCircleColour("grey");
            done[s] = 0;
            queue.enqueue(vertice);
            valueQueue.enqueue(vertice.getVertexValue());

            console.log(`Queue: ${valueQueue}`);
            console.log(`Pred: ${pred}`);
            console.log(`Done: ${done}`);
            console.log(" ");

            await wait();

            while (queue.isEmpty() == false) {
                const u = queue.peek()!;
                for (const v of u.getNeighbours().sort((v, w) => v.getVertexValue() - w.getVertexValue())) {
                    const i = v.getVertexValue();
                    if (colour[i] == "white") {
                        colour[i] = "grey";
                        v.setCircleColour("grey");
                        pred[i] = u.getVertexValue();
                        done[i] = done[u.getVertexValue()] + 1;
                        queue.enqueue(v);
                        valueQueue.enqueue(v.getVertexValue());

                        console.log(`Queue: ${valueQueue}`);
                        console.log(`Pred: ${pred}`);
                        console.log(`Done: ${done}`);
                        console.log(" ");

                        await wait();
                    }
                }
                queue.dequeue();
                valueQueue.dequeue();
                colour[u.getVertexValue()] = "black";
                u.setCircleColour("black");
                u.setTextColour("white");

                console.log(`Queue: ${valueQueue}`);
                console.log(`Pred: ${pred}`);
                console.log(`Done: ${done}`);
                console.log(" ");

                await wait();
            }
        }

        for (const vertice of sortedVertices) {
            if (colour[vertice.getVertexValue()] == "white") {
                await wait();
                await bfsVisit(vertice);
            }
        }
    }
}
