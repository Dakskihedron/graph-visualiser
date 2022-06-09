export async function wait(ms: number = 1000): Promise<void> {
    return new Promise<void>(resolve => {
        setTimeout(resolve, ms);
    });
}

export class Queue<T> {
    private data: T[] = new Array();

    public enqueue(item: T): void {
        this.data.push(item);
    }

    public dequeue(): void {
        this.data.splice(0, 1);
    }

    public peek(): T | undefined {
        return this.data[0];
    }

    public size(): number {
        return this.data.length;
    }

    public isEmpty(): boolean {
        return this.data.length == 0;
    }

    public toString(): string {
        return `<- |${this.data.join(", ")}| <-`;
    }
}

export class Stack<T> {
    private data: T[] = new Array();

    public push(item: T): void {
        this.data.push(item);
    }

    public pop(): void {
        this.data.pop();
    }

    public peek(): T {
        return this.data[this.data.length - 1];
    }

    public size(): number {
        return this.data.length;
    }

    public isEmpty(): boolean {
        return this.data.length == 0;
    }

    public toString(): string {
        return `[${this.data.join(", ")} <-`;
    }
}
