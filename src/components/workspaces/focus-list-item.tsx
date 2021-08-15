import { FcBdList } from "./focus.style";

interface FocusListItemProps {
  measure: string;
  content: string[];
}

export const FocusListItem = ({ measure, content }: FocusListItemProps) => {
  return (
    <FcBdList>
      <h4>{measure}</h4>
      <ul>
        {content.map((item, idx) => (
          <li key={`focus-list-item-${idx}`}>{item}</li>
        ))}
      </ul>
    </FcBdList>
  );
};
