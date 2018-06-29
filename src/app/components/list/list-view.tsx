import * as React from "react";

import { TaskItem } from "../../contracts/TaskItem";

import "./list-view-styles.css";

export type ListViewOnDeleteTaskHandler = (id: number) => void;
export type ListViewOnDoneTaskHandler = (id: number) => void;
export type ListViewOnCheckedTaskHandler = (checked: number[]) => void;

interface Props {
    itemDataForList: TaskItem[];
    onDeleteTask: ListViewOnDeleteTaskHandler;
    onDoneTask: ListViewOnDoneTaskHandler;
    onCheckedTask: ListViewOnCheckedTaskHandler;
    newCheckedTasks: number[];
}

interface State {
    itemData: TaskItem[];
    checkedItems: number[];
}

export class ListView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            itemData: [],
            checkedItems: []
        };
    }

    protected onDelete(event: React.MouseEvent<HTMLButtonElement>, currentid: number): void {
        this.props.onDeleteTask(currentid);
    }

    protected onDone(event: React.MouseEvent<HTMLDivElement>, currentid: number): void {
        this.props.onDoneTask(currentid);
    }

    protected onCheckboxClicked(event: React.MouseEvent<HTMLInputElement>, clickedId: number): void {
        const isChecked = event.currentTarget.checked;
        this.setState(state => {
            const nextState: State = {
                ...state
            };
            isChecked === true
                ? nextState.checkedItems.push(clickedId)
                : (nextState.checkedItems = nextState.checkedItems.filter(item => item !== clickedId));
            this.props.onCheckedTask(nextState.checkedItems);
            return nextState;
        });
    }
    public render(): JSX.Element {
        return (
            <div className="wrapper">
                <div className="Table">
                    <div className="TableBody">
                        {this.props.itemDataForList !== undefined ? (
                            this.props.itemDataForList.map((data, i) => (
                                <div className="TableRow" key={`list-item-${data.id}`}>
                                    <div className="TableCellCheckbox">
                                        <input onClick={event => this.onCheckboxClicked(event, data.id)} type="checkbox" />
                                        <span className="checkmark" />
                                    </div>
                                    {data.isDone === true ? (
                                        <div className="TableCellText" onClick={event => this.onDone(event, data.id)}>
                                            <del>{data.text}</del>
                                        </div>
                                    ) : (
                                        <div className="TableCellText" onClick={event => this.onDone(event, data.id)}>
                                            {data.text}
                                        </div>
                                    )}
                                    <div className="TableCellDelete">
                                        <button className="far fa-trash-alt" onClick={event => this.onDelete(event, data.id)} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
