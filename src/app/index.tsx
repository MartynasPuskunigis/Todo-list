import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  InputView,
  InputViewOnButtonClickedHandler,
  InputViewOnFilterButtonClickedHandler,
  InputViewOnDeleteAllButtonClickedHandler
} from "./components/input/input-view";
import {
  ListView,
  ListViewOnDeleteTaskHandler,
  ListViewOnDoneTaskHandler,
  ListViewOnCheckedTaskHandler
} from "./components/list/list-view";
import { TaskItem } from "./contracts/TaskItem";

interface State {
  baseitemData: TaskItem[];
  filteredItemData: TaskItem[];
  counter: number;
  filtertype: string;
  checkedIds: number[];
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      baseitemData: [],
      filteredItemData: [],
      counter: 0,
      filtertype: "ShowAll",
      checkedIds: []
    };
  }

  private onButtonClick: InputViewOnButtonClickedHandler = itemValue => {
    this.setState((state, counter) => {
      const nextState: State = {
        ...state,
        ...counter
      };
      const newTaskItem: TaskItem = {
        id: this.state.counter,
        text: itemValue,
        done: false
      };
      nextState.baseitemData.push(newTaskItem);
      nextState.counter = this.state.counter + 1;
      return nextState;
    });
    this.filterList();
  }

  private onDeleteClick: ListViewOnDeleteTaskHandler = id => {
    this.setState({
      baseitemData: this.state.baseitemData.filter(item => item.id !== id)
    });
    this.filterList();
  }

  private onDoneClick: ListViewOnDoneTaskHandler = id => {
    this.setState(state => {
      const nextState: State = {
        ...state
      };
      for (let i: number = 0; i < nextState.baseitemData.length; i++) {
        if (nextState.baseitemData[i].id === id) {
          nextState.baseitemData[i].done === false
            ? (nextState.baseitemData[i].done = true)
            : (nextState.baseitemData[i].done = false);
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
        case "Uncompleted":
          nextState.filteredItemData = nextState.baseitemData.filter(
            item => item.done !== true
          );
          break;
        case "Completed":
          nextState.filteredItemData = nextState.baseitemData.filter(
            item => item.done !== false
          );
          break;
        case "ShowAll":
          nextState.filteredItemData = nextState.baseitemData;
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
      nextState.baseitemData = nextState.baseitemData.filter(task => {
        for (let i = 0; i < nextState.baseitemData.length; i++) {
          if (nextState.checkedIds.indexOf(task.id) === -1) {
            nextState.checkedIds = nextState.checkedIds.filter(item => item !== task.id);
            return true;
          }
        }
      });
      return nextState;
    });
    this.filterList();
  }

  private updateCheckedTasks: ListViewOnCheckedTaskHandler = newCheckedTasks => {
    this.setState({
      checkedIds: newCheckedTasks
    });
  }
  public render(): JSX.Element {
    return (
      <div>
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
            newCheckedTasks={this.state.checkedIds}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-app"));
