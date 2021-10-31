import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { drelloColors } from "../../constants/colors";
import { Card } from "../../types/inner/board.g";

const InnerContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  border-radius: 0.2rem;
`;

const DisplayContainer = styled(InnerContainer)`
  grid-auto-flow: column;
  align-items: center;
  justify-content: flex-start;
  color: ${drelloColors.black(0.8)};
  padding: 0.5rem;
  :hover {
    background-color: ${drelloColors.black(0.3)};
  }
`;

const CardInput = styled.input`
  font-size: 0.8rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.2rem;
  text-transform: capitalize;
`;

const FormActions = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 1rem;
`;

const FormButton = styled.button`
  padding: 0.5rem 0;
  border: none;
  border-radius: 0.2rem;
  color: ${drelloColors.white(0.8)};
  background-color: ${drelloColors.black(0.4)};
`;

const FAIcon = styled(FontAwesomeIcon)`
  color: ${drelloColors.black(0.6)};
`;

export const NewColumnCard = () => {
  const [cardTitle, setCardTitle] = useState("");
  const [inputToggle, setInputToggle] = useState(true);

  const addCard = (e: React.SyntheticEvent) => {
    /* TODO: Implement add Card function */
    e.preventDefault();
    setInputToggle(true);
    console.log("Implement function to addCard ideally with redux");
  };
  return inputToggle ? (
    <DisplayContainer onClick={() => setInputToggle(false)}>
      <FAIcon icon="plus" />
      <span>Add a Card</span>
    </DisplayContainer>
  ) : (
    <InnerContainer onSubmit={addCard}>
      <CardInput
        placeholder="Enter title here..."
        value={cardTitle}
        onChange={(e) => setCardTitle(e.target.value)}
      />
      <FormActions>
        <FormButton>Add Card</FormButton>
        <FAIcon icon="times" onClick={() => setInputToggle(true)} />
      </FormActions>
    </InnerContainer>
  );
};
