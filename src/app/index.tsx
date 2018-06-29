import * as React from "react";

import * as ReactDOM from "react-dom";

import {
    InputView,
    InputViewOnButtonClickedHandler,
    InputViewOnFilterButtonClickedHandler,
    InputViewOnDeleteAllButtonClickedHandler,
    Filter
} from "./components/input/input-view";

import {
    ListView,
    ListViewOnDeleteTaskHandler,
    ListViewOnDoneTaskHandler,
    ListViewOnCheckedTaskHandler
} from "./components/list/list-view";

import { TaskItem } from "./contracts/TaskItem";

import "./index.css";

interface State {
    baseItemData: TaskItem[];
    filteredItemData: TaskItem[];
    taskIdCounter: number;
    filtertype: Filter;
    finishedTasksIds: number[];
}

class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            baseItemData: [],
            filteredItemData: [],
            taskIdCounter: 0,
            filtertype: Filter.ShowAll,
            finishedTasksIds: []
        };
    }

    private onButtonClick: InputViewOnButtonClickedHandler = itemValue => {
        this.setState((state, counter) => {
            const nextState: State = {
                ...state,
                ...counter
            };
            const newTaskItem: TaskItem = {
                id: this.state.taskIdCounter,
                text: itemValue,
                isDone: false
            };
            nextState.baseItemData.push(newTaskItem);
            nextState.taskIdCounter = this.state.taskIdCounter + 1;
            return nextState;
        });
        this.filterList();
    }

    private onDeleteClick: ListViewOnDeleteTaskHandler = id => {
        this.setState({
            baseItemData: this.state.baseItemData.filter(item => item.id !== id)
        });
        this.filterList();
    }

    private onDoneClick: ListViewOnDoneTaskHandler = id => {
        this.setState(state => {
            const nextState: State = {
                ...state
            };
            for (let i: number = 0; i < nextState.baseItemData.length; i++) {
                if (nextState.baseItemData[i].id === id) {
                    nextState.baseItemData[i].isDone === false
                        ? (nextState.baseItemData[i].isDone = true)
                        : (nextState.baseItemData[i].isDone = false);
                }
            }
            return nextState;
        });
        this.filterList();
    }

    private onFilterClick: InputViewOnFilterButtonClickedHandler = newfiltertype => {
        this.setState({
            filtertype: newfiltertype
        });
        this.filterList();
    }

    private filterList(): void {
        this.setState(state => {
            const nextState: State = {
                ...state
            };
            switch (nextState.filtertype) {
                case 2:
                    nextState.filteredItemData = nextState.baseItemData.filter(item => item.isDone !== true);
                    break;
                case 3:
                    nextState.filteredItemData = nextState.baseItemData.filter(item => item.isDone !== false);
                    break;
                case 1:
                    nextState.filteredItemData = nextState.baseItemData;
                    break;
            }
            return nextState;
        });
    }
    private onDeleteAllClick: InputViewOnDeleteAllButtonClickedHandler = () => {
        this.setState(state => {
            const nextState: State = {
                ...state
            };
            nextState.baseItemData = nextState.baseItemData.filter(task => {
                for (let i = 0; i < nextState.baseItemData.length; i++) {
                    if (nextState.finishedTasksIds.indexOf(task.id) === -1) {
                        nextState.finishedTasksIds = nextState.finishedTasksIds.filter(item => item !== task.id);
                        return true;
                    }
                }
                return;
            });
            return nextState;
        });
        this.filterList();
    }

    private updateCheckedTasks: ListViewOnCheckedTaskHandler = newCheckedTasks => {
        this.setState({
            finishedTasksIds: newCheckedTasks
        });
    }
    public render(): JSX.Element {
        return (
            <div className="wrapper">
                <div className="header">My amazing TODO list!</div>
                <div className="input">
                    <InputView
                        onButtonClicked={this.onButtonClick}
                        onFilterButtonClicked={this.onFilterClick}
                        onDeleteAllButtonClicked={this.onDeleteAllClick}
                    />
                </div>
                <div className="list">
                    <ListView
                        itemDataForList={this.state.filteredItemData}
                        onDeleteTask={this.onDeleteClick}
                        onDoneTask={this.onDoneClick}
                        onCheckedTask={this.updateCheckedTasks}
                        newCheckedTasks={this.state.finishedTasksIds}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app-root"));
