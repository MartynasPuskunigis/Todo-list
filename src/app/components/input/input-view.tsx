import * as React from "react";
import "./input-view-styles.css";

export type InputViewOnButtonClickedHandler = (itemValue: string) => void;
export type InputViewOnFilterButtonClickedHandler = (
  filtertype: Filter
) => void;
export type InputViewOnDeleteAllButtonClickedHandler = () => void;

export enum Filter {
  "ShowAll" = 1,
  "Uncompleted" = 2,
  "Completed" = 3,
}

interface Props {
  onButtonClicked: InputViewOnButtonClickedHandler;
  onFilterButtonClicked: InputViewOnFilterButtonClickedHandler;
  onDeleteAllButtonClicked: InputViewOnDeleteAllButtonClickedHandler;
}

interface State {
  inputValue: string;
  isErrorVisible: boolean;
}

export class InputView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: "",
      isErrorVisible: false
    };
  }
  protected handleChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    this.setState({
      inputValue: event.target.value
    });
  }

  protected isInputEmpty(inputValue: string): boolean {
    if (inputValue === "") {
      this.setState({
        isErrorVisible: true
      });
      return true;
    }
    return false;
  }
  protected submitNewItem: React.MouseEventHandler<
    HTMLButtonElement
  > = event => {
    if (this.isInputEmpty(this.state.inputValue)) {
     return;
    }
    this.props.onButtonClicked(this.state.inputValue);
    return this.setState({
      inputValue: "",
      isErrorVisible: false
    });
  }
  protected handleKeyboardPress: React.KeyboardEventHandler<
    HTMLInputElement
  > = event => {
    if (event.key === "Enter") {
      if (this.isInputEmpty(this.state.inputValue)) {
        return;
        }
      this.props.onButtonClicked(this.state.inputValue);
      this.setState({
        inputValue: "",
        isErrorVisible: false
      });
    }
  }

  protected onUncompletedClick: React.MouseEventHandler<
    HTMLButtonElement
  > = event => {
    this.props.onFilterButtonClicked(Filter.Uncompleted);
  }

  protected onCompletedClick: React.MouseEventHandler<
    HTMLButtonElement
  > = event => {
    this.props.onFilterButtonClicked(Filter.Completed);
  }

  protected onShowAllClick: React.MouseEventHandler<
    HTMLButtonElement
  > = event => {
    this.props.onFilterButtonClicked(Filter.ShowAll);
  }

  protected onDeleteAllClick: React.MouseEventHandler<
    HTMLButtonElement
  > = event => {
    this.props.onDeleteAllButtonClicked();
  }

  public render(): JSX.Element {
    return (
      <div>
        <div className="input-space">
          <div className="inputbox">
            <input
              onChange={this.handleChange}
              onKeyPress={this.handleKeyboardPress}
              type="text"
              placeholder="Add a task..."
              name="textbox"
              value={this.state.inputValue}
            />
          </div>
          {this.state.isErrorVisible ? (
            <div className="error">You didn't type anything!</div>
          ) : (
            <div className="error" />
          )}
        </div>
        <div className="submit">
          <button onClick={this.submitNewItem}>Submit</button>
        </div>
        <div className="filter-buttons">
          <button onClick={this.onUncompletedClick}>
            Show only uncompleted
          </button>
          <button onClick={this.onCompletedClick}>Show only completed</button>
          <button onClick={this.onShowAllClick}>Show all</button>
          <button onClick={this.onDeleteAllClick}>Delete selected</button>
        </div>
      </div>
    );
  }
}
