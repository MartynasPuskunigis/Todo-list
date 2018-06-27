import * as React from "react";
import * as ReactDOM from "react-dom";
import { InputView, InputViewOnButtonClickedHandler } from "./components/input/input-view";
import { ListView, ListViewOnDeleteTaskHandler } from "./components/list/list-view";
import { TaskItem } from "./contracts/TaskItem";

interface State {
  itemData: TaskItem[];
}

class App extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      itemData: []
    };
  }

  private onButtonClick: InputViewOnButtonClickedHandler = itemValue => {
    this.setState(state => {
      const nextState: State = {
        ...state
      };

      const newTaskItem: TaskItem = {
        id: nextState.itemData.length,
        text: itemValue,
        done: false
      };
      nextState.itemData.push(newTaskItem);

      return nextState;
    });
  }

  private onDeleteClick: ListViewOnDeleteTaskHandler = id => {
    console.log(id);
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
