import { Dispatcher } from "simplr-flux";

import { TodoAddAction, TodoDeleteAction, TodoCompletionChangedAction, FilterChangedAction } from "./todo-actions";
import { Filter } from "../components/input-view";

export namespace TodoActionsCreators {
    export function todoAdded(task: string): void {
        Dispatcher.dispatch(new TodoAddAction(task));
    }
    export function todoDeleted(taskId: number): void {
        Dispatcher.dispatch(new TodoDeleteAction(taskId));
    }
    export function todoCompletionChanged(taskId: number): void {
        Dispatcher.dispatch(new TodoCompletionChangedAction(taskId));
    }
    export function filterClicked(filtertype: Filter): void {
        Dispatcher.dispatch(new FilterChangedAction(filtertype));
    }
}
