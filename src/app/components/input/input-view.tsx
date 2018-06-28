import * as React from "react";

export type InputViewOnButtonClickedHandler = (itemValue: string) => void;
export type InputViewOnFilterButtonClickedHandler = (
  filtertype: string
) => void;
export type InputViewOnDeleteAllButtonClickedHandler = () => void;

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
  protected submitNewItem: React.MouseEventHandler<
    HTMLButtonElement
  > = event => {
    if (this.state.inputValue === "") {
      this.setState({
        isErrorVisible: true
      });
    } else {
      this.props.onButtonClicked(this.state.inputValue);
      this.setState({
        inputValue: "",
        isErrorVisible: false
      });
    }
  }
  protected handleKeyboardPress: React.KeyboardEventHandler<
    HTMLInputElement
  > = event => {
    if (event.key === "Enter") {
      if (this.state.inputValue === "") {
        this.setState({
          isErrorVisible: true
        });
      } else {
        this.props.onButtonClicked(this.state.inputValue);
        this.setState({
          inputValue: "",
          isErrorVisible: false
        });
      }
    }
  }

  protected onUncompletedClick: React.MouseEventHandler<
    HTMLButtonElement
  > = event => {
    this.props.onFilterButtonClicked("Uncompleted");
  }

  protected onCompletedClick: React.MouseEventHandler<
    HTMLButtonElement
  > = event => {
    this.props.onFilterButtonClicked("Completed");
  }

  protected onShowAllClick: React.MouseEventHandler<
    HTMLButtonElement
  > = event => {
    this.props.onFilterButtonClicked("ShowAll");
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
              placeholder={"Type your task here"}
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
