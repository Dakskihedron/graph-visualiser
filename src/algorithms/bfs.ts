import GraphNode from "../graph-node.js";
import { wait, Queue } from "../utils.js";

export default abstract class BFS {
    public static async runAlgorithm(nodeList: GraphNode[]): Promise<void> {
        const sortedNodeList = nodeList.sort((v, w) => v.getNodeValue() - w.getNodeValue());
        const colour: string[] = new Array(sortedNodeList.length).fill("white");
        const pred: number[] = new Array(sortedNodeList.length).fill(null);
        const done: number[] = new Array(sortedNodeList.length).fill(null);
        const queue = new Queue<GraphNode>();

        await wait();

        async function bfsVisit(node: GraphNode) {
            const s = node.getNodeValue();
            colour[s] = "grey";
            node.setNodeColour("grey");
            done[s] = 0
            queue.enqueue(node);

            await wait();

            while (queue.isEmpty() == false) {
                const u = queue.peek()!;
                for (const v of u.getListOfNeighbours().sort((v, w) => v.getNodeValue() - w.getNodeValue())) {
                    const i = v.getNodeValue();
                    if (colour[i] == "white") {
                        colour[i] = "grey";
                        v.setNodeColour("grey");
                        pred[i] = u.getNodeValue();
                        done[i] = done[u.getNodeValue()] + 1;
                        queue.enqueue(v);
                        await wait();
                    }
                }
                queue.dequeue();
                colour[u.getNodeValue()] = "black";
                u.setNodeColour("black");
                u.setTextColour("white");

                await wait();
            }

        }

        for (const node of sortedNodeList) {
            if (colour[node.getNodeValue()] == "white") {
                await bfsVisit(node);
            }
        }

        console.log(pred);
        console.log(done);
    }
}