import React from "react";
import { Row } from "./Row";
import { IRow } from "../types/page.type";

interface IProps {
  records: IRow[];
  onCheck: (id: number) => Promise<boolean>;
  onDragAndDrop: (from: number, to: number) => void;
}

const List: React.FC<IProps> = ({ records, onDragAndDrop, onCheck }) => {
  return (
    <table className="table">
      <tbody>
        <tr className="table-row">
          <th>&nbsp;</th>
          <th>&#8470;</th>
          <th>Id</th>
          <th>email</th>
        </tr>
        {records &&
          records.map(([id, checked, value], position) => (
            <Row
              id={id}
              key={`row-${id}`}
              value={value}
              position={position}
              checked={checked}
              onDragAndDrop={onDragAndDrop}
              onCheck={onCheck}
            />
          ))}
      </tbody>
    </table>
  );
};

export default List;
