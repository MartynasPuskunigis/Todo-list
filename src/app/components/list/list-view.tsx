import * as React from "react";
import { TaskItem } from "../../contracts/TaskItem";

export type ListViewOnDeleteTaskHandler = (id: number) => void;

interface Props {
  itemDataForList: TaskItem[];
  onDeleteTask: ListViewOnDeleteTaskHandler;
}

interface State {
  itemData: TaskItem[];
  currentid: number;
}

export class ListView extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      itemData: [],
      currentid: 0
    };
  }

  protected onDelete: React.MouseEventHandler<HTMLButtonElement> = event => {
    this.props.onDeleteTask(this.state.currentid);
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
            {this.props.itemDataForList !== undefined ? this.props.itemDataForList.map((data, i) =>
              (
                // this.setState({
                //   currentid: data.id
                // }),
                <tr key={`list-item-${i}`}>
                  <td>{data.id + 1}</td>
                  <td>{data.text}</td>
                  <td><button onClick={this.onDelete}>X</button></td>
                </tr>
              )) : <div></div>
              }
          </tbody>
        </table>
        </div>
      );
    }
  }
