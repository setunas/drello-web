import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { colors } from "src/utils/styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { postColumnThunk } from "src/features/column/column.slice";

const MainContainer = styled.div`
  display: grid;
  min-width: 15vw;
  @media screen and (max-width: 720px) {
    min-width: 20vw;
  }
`;

const DisplayContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-auto-flow: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 2rem;
  color: ${colors.black(0.8)};
  background-color: ${colors.greyish(0.6)};
  :hover {
    background-color: ${colors.greyish(0.8)};
  }
`;

const EditContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
  background-color: ${colors.greyish()};
`;

const Input = styled.input`
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
  color: ${colors.white(0.8)};
  background-color: ${colors.black(0.4)};
`;

const FAIcon = styled(FontAwesomeIcon)`
  color: ${colors.black(0.6)};
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
          <FAIcon icon="plus" />
          <span>Add new column</span>
        </DisplayContainer>
      ) : (
        <EditContainer onSubmit={handleSubmit(addColumnHandler)}>
          <Input placeholder="Enter title here..." {...register("title")} />
          <FormActions>
            <FormButton>Add Column</FormButton>
            <FAIcon icon="times" onClick={() => setInputToggle(true)} />
          </FormActions>
        </EditContainer>
      )}
    </MainContainer>
  );
};
