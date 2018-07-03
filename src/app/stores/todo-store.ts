import { ReduceStore, ActionHandler } from "simplr-flux";

import { TodoAddAction, TodoDeleteAction, TodoCompletionChangedAction } from "./../actions/todo-actions";

import { Task } from "./../contracts/Task";

interface StoreState {
    allTasks: Task[];
}

class TodoReduceStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(TodoAddAction, this.onAddTodo);
        this.registerAction(TodoDeleteAction, this.onDeleteTodo);
        this.registerAction(TodoCompletionChangedAction, this.onTodoCompletionChanged);
    }

    private onAddTodo: ActionHandler<TodoAddAction, StoreState> = (action, state) => {
        const newId = Number(new Date().getTime());
        const newTask = {
            id: newId,
            text: action.tasktext,
            isDone: false
        };

        return {
            ...state,
            allTasks: [...state.allTasks, newTask]
        };
    };

    private onDeleteTodo: ActionHandler<TodoDeleteAction, StoreState> = (action, state) => {
        const newTasks = state.allTasks.filter(item => item.id !== action.taskId);

        return {
            ...state,
            allTasks: newTasks
        };
    };

    private onTodoCompletionChanged: ActionHandler<TodoCompletionChangedAction, StoreState> = (action, state) => {
        const newTasks = state.allTasks.map(item => item);
        for (let i = 0; i < newTasks.length; i++) {
            if (newTasks[i].id === action.taskId) {
                newTasks[i].isDone = !newTasks[i].isDone;
            }
        }
        return {
            ...state,
            allTasks: newTasks
        };
    };

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
