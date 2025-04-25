import React, { useRef, useState } from "react";
import CheckBox from "./CheckBox";

interface IProps {
  position: number;
  id: number;
  value: string;
  checked: boolean;
  onCheck: (id: number) => Promise<boolean>;
  onDragAndDrop: (from: number, to: number) => void;
}

export const Row: React.FC<IProps> = ({
  position,
  value,
  checked,
  id,
  onCheck,
  onDragAndDrop,
}) => {
  const rowRef = useRef<HTMLTableRowElement>(null);
  const [isSelected, setSelected] = useState<boolean>(checked);

  const onDrag = (event: React.DragEvent<HTMLTableRowElement>) => {
    event.dataTransfer.dropEffect = "copy";
    event.dataTransfer.setData("text/plain", String(position));
  };

  const onDrop = (event: React.DragEvent<HTMLTableRowElement>) => {
    event.preventDefault();
    try {
      const from = parseInt(event.dataTransfer.getData("text/plain"));
      if (!isNaN(from) && !isNaN(position)) {
        if (from !== position) onDragAndDrop(from, position);
      }
    } catch (e: unknown) {
      if (e instanceof Error) console.error(e.message);
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const checkHandler = () => {
    onCheck(id).then((result) => {
      if (result) setSelected((state) => !state);
    });
  };

  return (
    <tr
      ref={rowRef}
      className="table-row"
      data-position={position}
      onDragStart={onDrag}
      onDragOver={onDragOver}
      onDrop={onDrop}
      draggable="true"
    >
      <td>
        <div className="table-row_checkbox" onClick={checkHandler}>
          <CheckBox checked={isSelected} />
        </div>
      </td>
      <td>
        <div className="table-row_number">{position + 1}</div>
      </td>
      <td>
        <div className="table-row_number">{id}</div>
      </td>
      <td>
        <div className="table-row_value">{value}</div>
      </td>
    </tr>
  );
};
