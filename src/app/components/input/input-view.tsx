import * as React from "react";

export type InputViewOnButtonClickedHandler = (itemValue: string) => void;

interface Props {
  onButtonClicked: InputViewOnButtonClickedHandler;
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
    this.props.onButtonClicked(this.state.inputValue);
    this.setState({
      inputValue: ""
    });
  }

  public render(): JSX.Element {
    return (
      <div>
        <div className="textbox">
          <input
            onChange={this.handleChange}
            type="text"
            placeholder={"Type your task here"}
            name="textbox"
            value={this.state.inputValue}
          />
        </div>
        <div className="submit">
          <button onClick={this.submitNewItem}>Submit</button>
        </div>
      </div>
    );
  }
}
