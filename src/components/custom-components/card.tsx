import styled from "styled-components";

const BdCard = styled.section`
  display: grid;
  justify-items: center;
  align-items: center;
  height: 8rem;
  width: 15rem;
  padding: 1rem;
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

export const Card = ({ title }: BoardCardProps) => {
  return (
    <BdCard>
      <BdTitle>{title}</BdTitle>
    </BdCard>
  );
};
