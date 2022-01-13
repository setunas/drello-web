import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { colors } from "src/utils/styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { postColumnThunk } from "src/features/column/column.slice";
import { PrimaryButton } from "../button/primary-button";

const MainContainer = styled.div`
  display: grid;
  min-width: 15vw;
  @media screen and (max-width: 720px) {
    min-width: 20vw;
  }
`;

const DisplayContainer = styled.div`
  border-radius: 0.5rem;
  padding: 1rem 1.3rem;
  width: 20rem;
  height: fit-content;

  display: grid;
  gap: 0.5rem;
  grid-auto-flow: column;
  align-items: center;
  justify-content: flex-start;

  background-color: ${colors.backgroundB};
  color: ${colors.boldText};
  cursor: pointer;
`;

const EditContainer = styled.form`
  border-radius: 0.5rem;
  padding: 1rem;
  width: 20rem;
  height: fit-content;

  display: grid;
  gap: 1rem;
  background-color: ${colors.backgroundB};
`;

const Input = styled.input`
  font-size: 1.2rem;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  text-transform: capitalize;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1rem;
`;

const CancelButton = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: ${colors.primary};
  cursor: pointer;
`;

const FAIcon = styled(FontAwesomeIcon)`
  color: ${colors.black(0.6)};
  cursor: pointer;
`;

interface FormInputs {
  title: string;
}

interface NewColumnProps {
  boardId: number;
}

export const NewColumn = ({ boardId }: NewColumnProps) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm<FormInputs>();
  const [inputToggle, setInputToggle] = useState(true);

  const addColumnHandler: SubmitHandler<FormInputs> = (data) => {
    dispatch(postColumnThunk({ title: data.title, boardId }));
    reset();
    setInputToggle(true);
  };

  return (
    <MainContainer>
      {inputToggle ? (
        <DisplayContainer onClick={() => setInputToggle(false)}>
          <FAIcon icon={faPlus} />
          <span>Add new column</span>
        </DisplayContainer>
      ) : (
        <EditContainer onSubmit={handleSubmit(addColumnHandler)}>
          <Input
            type="text"
            placeholder="Enter title here..."
            {...register("title")}
          />
          <FormActions>
            <PrimaryButton text="Add" style={{ padding: "0.5em 2em" }} />
            <CancelButton onClick={() => setInputToggle(true)}>
              Cancel
            </CancelButton>
          </FormActions>
        </EditContainer>
      )}
    </MainContainer>
  );
};
