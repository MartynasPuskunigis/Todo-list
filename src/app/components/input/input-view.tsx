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
}

export class InputView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: ""
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
      alert("You didn't type anything!");
    } else {
      this.props.onButtonClicked(this.state.inputValue);
      this.setState({
        inputValue: ""
      });
    }
  }
  protected handleKeyboardPress: React.KeyboardEventHandler<
    HTMLInputElement
  > = event => {
    if (event.key === "Enter") {
      if (this.state.inputValue === "") {
        alert("You didn't type anything!");
      } else {
        this.props.onButtonClicked(this.state.inputValue);
        this.setState({
          inputValue: ""
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

  protected onDeleteAllClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    this.props.onDeleteAllButtonClicked();
  }

  public render(): JSX.Element {
    return (
      <div>
        <div className="textbox">
          <input
            onChange={this.handleChange}
            onKeyPress={this.handleKeyboardPress}
            type="text"
            placeholder={"Type your task here"}
            name="textbox"
            value={this.state.inputValue}
          />
        </div>
        <div className="submit">
          <button onClick={this.submitNewItem}>Submit</button>
        </div>
        <div className="filter-buttons">
          <button onClick={this.onUncompletedClick}>
            Show only uncompleted
          </button>
          <button onClick={this.onCompletedClick}>
            Show only completed
          </button>
          <button onClick={this.onShowAllClick}>
            Show all
          </button>
          <button onClick={this.onDeleteAllClick}>
            Delete selected
          </button>
        </div>
      </div>
    );
  }
}
