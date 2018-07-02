import { ReduceStore } from "simplr-flux";

import { TodoAddAction } from "./../actions/todo-actions";

import { Task } from "./../contracts/Task";

interface StoreState {
    allTasks: Task[];
}

class TodoReduceStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(TodoAddAction, this.onAddTodo.bind(this));
    }

    private onAddTodo(action: TodoAddAction, state: StoreState): StoreState {
        const newId = Number(new Date().getTime);
        const newTask = {
            id: newId,
            text: action.Task,
            isDone: false
        };

        state.allTasks.push(newTask);

        return {
            allTasks: state.allTasks
        };
    }

    public getInitialState(): StoreState {
        return {
            allTasks: []
        };
    }

    public get Tasks(): Task[] {
        return this.getState().allTasks;
    }
}

export const TodoReduceStore = new TodoReduceStoreClass();
