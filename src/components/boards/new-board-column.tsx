import { useState } from "react";
import styled from "styled-components";

export const NewBoardColumn = () => {
  const [columnTitle, setColumnTitle] = useState("");
  const [inputToggle, setInputToggle] = useState(true);

  const addColumn = (e) => {
    /* TODO: Implement add Column function */
    e.preventDefault();
    setInputToggle(true);
    console.log("Implement function to addColumn ideally with redux");
  };
  return (
    <NewColumnContainer>
      {inputToggle ? (
        <InputToggle onClick={() => setInputToggle(false)}>
          <span>+</span>
          <span>Add new column</span>
        </InputToggle>
      ) : (
        <ColumnForm onSubmit={addColumn}>
          <ColumnInput
            placeholder="Enter title here..."
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
          />
          <FormActions>
            <FormButton>Add Column</FormButton>
            <span onClick={() => setInputToggle(true)}>X</span>
          </FormActions>
        </ColumnForm>
      )}
    </NewColumnContainer>
  );
};

const NewColumnContainer = styled.div`
  display: grid;
  gap: 1rem;
  height: fit-content;
  min-width: 20vw;
  width: fit-content;
  border: none;
  padding: 0.5rem 0;
  border-radius: 0.3rem;
  background-color: rgba(220, 220, 220, 0.8);
  @media only screen and (min-width: 900px) {
    min-width: 15vw;
  }
`;

const InputToggle = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-self: center;
  gap: 1rem;
`;

const ColumnInput = styled.input`
  font-size: 0.8rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.3rem;
  text-transform: capitalize;
`;

const ColumnForm = styled.form`
  display: grid;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const FormActions = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 0.3rem;
`;

const FormButton = styled.button`
  padding: 0.2rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 0.2rem;
`;
