import * as React from "react";
import { TaskItem } from "../../contracts/TaskItem";

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

  protected onDelete(
    event: React.MouseEvent<HTMLButtonElement>,
    currentid: number
  ): void {
    this.props.onDeleteTask(currentid);
  }

  protected onDone(
    event: React.MouseEvent<HTMLTableDataCellElement>,
    currentid: number
  ): void {
    this.props.onDoneTask(currentid);
  }

  protected onCheckboxClicked(
    event: React.MouseEvent<HTMLInputElement>,
    clickedId: number
  ): void {
    const isChecked = event.currentTarget.checked;
    this.setState(state => {
      const nextState: State = {
        ...state
      };
      isChecked === true
      ? nextState.checkedItems.push(clickedId)
      : nextState.checkedItems = nextState.checkedItems.filter(item => item !== clickedId);
      this.props.onCheckedTask(nextState.checkedItems);
      return nextState;
    });
  }
  public render(): JSX.Element {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {this.props.itemDataForList !== undefined ? (
              this.props.itemDataForList.map((data, i) => (
                <tr key={`list-item-${data.id}`}>
                  <td>{data.id + 1}</td>
                  {data.done === true ? (
                    <td onClick={event => this.onDone(event, data.id)}>
                      <del>{data.text}</del>
                    </td>
                  ) : (
                    <td onClick={event => this.onDone(event, data.id)}>
                      {data.text}
                    </td>
                  )}
                  <td>
                    <button onClick={event => this.onDelete(event, data.id)}>
                      X
                    </button>
                  </td>
                  <td>
                    <input onClick={event => this.onCheckboxClicked(event, data.id)} type="checkbox">

                    </input>
                  </td>
                </tr>
              ))
            ) : (
              <div />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
