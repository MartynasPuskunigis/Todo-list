import * as React from "react";

import { Task } from "./../contracts/Task";

import { TodoContainer } from "./../containers/list-container";

interface State {
    Tasks: Task[];
}

export class ListView extends React.Component<{}, State> {
    public render(): JSX.Element {
        return (
            <div>
                <TodoContainer />
            </div>
        );
    }
}
