import GraphNode from "../graph-node.js";
import { wait } from "../utils.js";

export default abstract class DFS {
    public static async runAlgorithm(nodeList: GraphNode[]): Promise<void> {
        const sortedNodeList = nodeList.sort((v, w) => v.getNodeValue() - w.getNodeValue());
        const colour: string[] = new Array(sortedNodeList.length).fill("white");
        const pred: number[] = new Array(sortedNodeList.length).fill(null);
        const seen: number[] = new Array(sortedNodeList.length).fill(null);
        const done: number[] = new Array(sortedNodeList.length).fill(null);
        let time = 0;

        await wait();

        async function dfsRecursiveVisit(node: GraphNode) {
            const s = node.getNodeValue();
            colour[s] = "grey";
            node.setNodeColour("grey");
            seen[s] = time++;

            await wait();

            for (const neighbour of node.getListOfNeighbours().sort((v, w) => v.getNodeValue() - w.getNodeValue())) {
                if (colour[neighbour.getNodeValue()] == "white") {
                    pred[neighbour.getNodeValue()] = s;
                    await dfsRecursiveVisit(neighbour);
                }
            }

            colour[s] = "black";
            node.setNodeColour("black");
            node.setTextColour("white");
            done[s] = time++;

            await wait();
        }

        for (const node of sortedNodeList) {
            if (colour[node.getNodeValue()] == "white") {
                await wait();
                await dfsRecursiveVisit(node);
            }
        }

        console.log(pred);
        console.log(seen);
        console.log(done);
    }
}