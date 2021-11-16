import { Column } from "src/components/columns/column";
import { Column as ColumnType } from "src/types/column.g";
import { useSelector } from "react-redux";
import { selectColumns } from "src/redux/domain/column";

export const ColumnList = () => {
  const columns = useSelector(selectColumns);

  return (
    <>
      {columns?.map(({ id, title }: ColumnType) => (
        <Column key={id} title={title || ""} columnId={id} />
      ))}
    </>
  );
};
