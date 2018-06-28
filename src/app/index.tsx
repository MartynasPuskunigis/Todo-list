import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  InputView,
  InputViewOnButtonClickedHandler,
  InputViewOnFilterButtonClickedHandler
} from "./components/input/input-view";
import {
  ListView,
  ListViewOnDeleteTaskHandler,
  ListViewOnDoneTaskHandler
} from "./components/list/list-view";
import { TaskItem } from "./contracts/TaskItem";

interface State {
  baseitemData: TaskItem[];
  filteredItemData: TaskItem[];
  counter: number;
  filtertype: string;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      baseitemData: [],
      filteredItemData: [],
      counter: 0,
      filtertype: "ShowAll"
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
  public render(): JSX.Element {
    return (
      <div>
        <div className="input">
          <InputView
            onButtonClicked={this.onButtonClick}
            onFilterButtonClicked={this.onFilterClick}
          />
        </div>
        <div className="list">
          <ListView
            itemDataForList={this.state.filteredItemData}
            onDeleteTask={this.onDeleteClick}
            onDoneTask={this.onDoneClick}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-app"));
