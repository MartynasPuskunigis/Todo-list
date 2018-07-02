import * as React from "react";

import { TodoActionsCreators } from "./../actions/todo-actions-creators";

interface State {
    currentInputValue: string;
}

export class InputView extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            currentInputValue: ""
        };
    }

    protected handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        this.setState({
            currentInputValue: event.target.value
        });
    };

    protected onSubmitClick: React.MouseEventHandler<HTMLButtonElement> = event => {
        if (this.state.currentInputValue.length === 0) {
            alert("Hey! Write something!");
        } else {
            TodoActionsCreators.TodoAdded(this.state.currentInputValue);
        }
    };

    public render(): JSX.Element {
        return (
            <div>
                <div>
                    <input onChange={this.handleInputChange} placeholder="Add a task..." />
                </div>
                <div>
                    <button onClick={this.onSubmitClick}>Submit</button>
                </div>
            </div>
        );
    }
}
