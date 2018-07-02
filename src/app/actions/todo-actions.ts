export class TodoAddAction {
    constructor(private task: string) {}

    public get Task(): string {
        return this.task;
    }
}
