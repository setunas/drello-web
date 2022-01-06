import { Column } from "src/features/column/column";
import { Column as ColumnType } from "src/features/column/column.g";
import { useSelector } from "react-redux";
import { selectColumnsByBoardId } from "src/features/column/column.slice";

interface ColumnListProps {
  boardId: number;
}

export const ColumnList = ({ boardId }: ColumnListProps) => {
  const columns = useSelector(selectColumnsByBoardId(boardId));

  return (
    <>
      {columns?.map(({ id, title }: ColumnType, index: number) => (
        <Column key={id} title={title || ""} columnId={id} index={index} />
      ))}
    </>
  );
};
