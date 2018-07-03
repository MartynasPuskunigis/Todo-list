export class TodoAddAction {
    constructor(private task: string) {}

    public get tasktext(): string {
        return this.task;
    }
}
export class TodoDeleteAction {
    constructor(private id: number) {}

    public get taskId(): number {
        return this.id;
    }
}
export class TodoCompletionChangedAction {
    constructor(private id: number) {}

    public get taskId(): number {
        return this.id;
    }
}
