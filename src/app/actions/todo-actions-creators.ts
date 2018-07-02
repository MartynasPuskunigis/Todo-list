import { Dispatcher } from "simplr-flux";

import { TodoAddAction } from "./todo-actions";

export namespace TodoActionsCreators {
    export function TodoAdded(task: string): void {
        Dispatcher.dispatch(new TodoAddAction(task));
    }
}
