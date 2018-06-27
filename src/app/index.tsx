import * as React from "react";
import * as ReactDOM from "react-dom";
import { InputView, InputViewOnButtonClickedHandler } from "./components/input/input-view";
import { ListView, ListViewOnDeleteTaskHandler } from "./components/list/list-view";
import { TaskItem } from "./contracts/TaskItem";

interface State {
  itemData: TaskItem[];
  counter: number;
}

class App extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      itemData: [],
      counter: 0
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
      nextState.itemData.push(newTaskItem);
      nextState.counter = this.state.counter + 1;
      return nextState;
    });
  }

  private onDeleteClick: ListViewOnDeleteTaskHandler = id => {
    this.setState({
      itemData: this.state.itemData.filter(item => item.id !== id)
    });
  }

  public render(): JSX.Element {
    return (
      <div>
        <div className="input">
        <InputView onButtonClicked={this.onButtonClick}   />
        </div>
        <div className="list">
          <ListView itemDataForList={this.state.itemData} onDeleteTask={this.onDeleteClick}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-app"));
