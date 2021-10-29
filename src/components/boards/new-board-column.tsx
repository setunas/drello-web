import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { drelloColors } from "../shared-styles";

const NewColumnContainer = styled.div`
  display: grid;
  min-width: 15vw;
  @media screen and (max-width: 720px) {
    min-width: 20vw;
  }
`;

const InnerContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
`;

const DisplayContainer = styled(InnerContainer)`
  grid-auto-flow: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 2rem;
  color: ${drelloColors.black(0.8)};
  background-color: ${drelloColors.greyish(0.6)};
  :hover {
    background-color: ${drelloColors.greyish(0.8)};
  }
`;

const EditContainer = styled(InnerContainer)`
  background-color: ${drelloColors.greyish()};
`;

const ColumnInput = styled.input`
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

export const NewBoardColumn = () => {
  const [columnTitle, setColumnTitle] = useState("");
  const [inputToggle, setInputToggle] = useState(true);

  const addColumn = (e: React.SyntheticEvent) => {
    /* TODO: Implement add Column function */
    e.preventDefault();
    setInputToggle(true);
    console.log("Implement function to addColumn ideally with redux");
  };
  return (
    <NewColumnContainer>
      {inputToggle ? (
        <DisplayContainer onClick={() => setInputToggle(false)}>
          <FAIcon icon="plus" />
          <span>Add new column</span>
        </DisplayContainer>
      ) : (
        <EditContainer onSubmit={addColumn}>
          <ColumnInput
            placeholder="Enter title here..."
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
          />
          <FormActions>
            <FormButton>Add Column</FormButton>
            <FAIcon icon="times" onClick={() => setInputToggle(true)} />
          </FormActions>
        </EditContainer>
      )}
    </NewColumnContainer>
  );
};
