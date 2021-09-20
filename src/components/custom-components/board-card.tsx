import styled from "styled-components";

const BdCard = styled.section`
  display: grid;
  padding: 2rem;
  justify-items: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
`;

const BdTitle = styled.h2`
  font-size: 1.4em;
  text-transform: uppercase;
  text-align: center;
`;

interface BoardCardProps {
  title: string;
}

export const BoardCard = ({ title }: BoardCardProps) => {
  return (
    <BdCard>
      <BdTitle>{title}</BdTitle>
    </BdCard>
  );
};
