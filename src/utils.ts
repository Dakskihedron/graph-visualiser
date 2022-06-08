export async function wait(ms: number = 1000): Promise<void> {
    return new Promise<void>(resolve => {
        setTimeout(resolve, ms);
    });
}

export class Queue<T> {
    private _data: T[] = new Array();

    public enqueue(item: T): void {
        this._data.push(item);
    }

    public dequeue(): void | undefined {
        this._data.splice(0, 1);
    }

    public peek(): T | undefined {
        return this._data[0];
    }

    public size(): number {
        return this._data.length;
    }

    public isEmpty(): boolean {
        return this._data.length == 0;
    }

    public toString(): string {
        return `<- |${this._data.join(", ")}| <-`;
    }
}
