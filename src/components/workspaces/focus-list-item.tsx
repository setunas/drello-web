import styled from "styled-components";

const FcBdList = styled.div`
  padding: 2rem 3rem;
  justify-content: center;
  align-content: space-between;
`;

const FcBdHeader = styled.h4`
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const FcBdItem = styled.li`
  list-style-type: none;
  text-align: left;
`;

interface FocusListItemProps {
  measure: string;
  content: string[];
}

export const FocusListItem = ({ measure, content }: FocusListItemProps) => {
  return (
    <FcBdList>
      <FcBdHeader>{measure}</FcBdHeader>
      <ul>
        {content.map((item, idx) => (
          <FcBdItem key={`focus-list-item-${idx}`}>{item}</FcBdItem>
        ))}
      </ul>
    </FcBdList>
  );
};
