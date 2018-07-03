import { ReduceStore, ActionHandler } from "simplr-flux";

import { TodoAddAction, TodoDeleteAction, TodoCompletionChangedAction, FilterChangedAction } from "./../actions/todo-actions";

import { Task } from "./../contracts/Task";
import { Filter } from "../components/input-view";

interface StoreState {
    allTasks: Task[];
    tasksToShow: Task[];
    currentFilter: Filter;
}

class TodoReduceStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(TodoAddAction, this.onAddTodo);
        this.registerAction(TodoDeleteAction, this.onDeleteTodo);
        this.registerAction(TodoCompletionChangedAction, this.onTodoCompletionChanged);
        this.registerAction(FilterChangedAction, this.onFilterChanged);
    }

    private onAddTodo: ActionHandler<TodoAddAction, StoreState> = (action, state) => {
        const newId = Number(new Date().getTime());
        const newTask = {
            id: newId,
            text: action.tasktext,
            isDone: false
        };
        const nextState: StoreState = {
            ...state,
            allTasks: [...state.allTasks, newTask]
        };
        return TodoReduceStoreClass.calculateState(nextState);
    };

    private onDeleteTodo: ActionHandler<TodoDeleteAction, StoreState> = (action, state) => {
        const newTasks = state.allTasks.filter(item => item.id !== action.taskId);

        const nextState: StoreState = {
            ...state,
            allTasks: newTasks
        };
        return TodoReduceStoreClass.calculateState(nextState);
    };

    private onTodoCompletionChanged: ActionHandler<TodoCompletionChangedAction, StoreState> = (action, state) => {
        const newTasks = state.allTasks.map(item => item);
        for (let i = 0; i < newTasks.length; i++) {
            if (newTasks[i].id === action.taskId) {
                newTasks[i].isDone = !newTasks[i].isDone;
            }
        }
        const nextState: StoreState = {
            ...state,
            allTasks: newTasks
        };
        return TodoReduceStoreClass.calculateState(nextState);
    };

    protected onFilterChanged: ActionHandler<FilterChangedAction, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state,
            currentFilter: action.filter
        };
        return TodoReduceStoreClass.calculateState(nextState);
    };

    protected static calculateState(state: StoreState): StoreState {
        switch (state.currentFilter) {
            case Filter.Uncompleted: {
                state.tasksToShow = state.allTasks.filter(item => item.isDone !== true);
                break;
            }
            case Filter.Completed: {
                state.tasksToShow = state.allTasks.filter(item => item.isDone !== false);
                break;
            }
            case Filter.ShowAll: {
                state.tasksToShow = state.allTasks;
                break;
            }
        }
        return state;
    }

    public getInitialState(): StoreState {
        return {
            allTasks: [],
            tasksToShow: [],
            currentFilter: Filter.ShowAll
        };
    }

    public get Tasks(): Task[] {
        return this.getState().tasksToShow;
    }
}

export const TodoReduceStore = new TodoReduceStoreClass();
