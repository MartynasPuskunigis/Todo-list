import * as React from "react";
import { Container } from "flux/utils";

import { Task } from "./../contracts/Task";

import { TodoReduceStore } from "./../stores/todo-store";

interface State {
    Tasks: Task[];
}

class TodoContainerClass extends React.Component<{}, State> {
    // public static getStores() {
    //     return [TodoReduceStore];
    // }

    // public static calculateState(state: State): State {
    //     return {
    //         Tasks: TodoReduceStore.getState().allTasks
    //     };
    // }

    public render(): JSX.Element {
        const TodoTasks = this.state.Tasks.map(task => (
            <div key={task.id}>
                <div>{task.text}</div>
            </div>
        ));
        return <div>{TodoTasks}</div>;
    }
}
export const TodoContainer = Container.create(TodoContainerClass);
