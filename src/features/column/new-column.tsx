import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { colors } from "src/utils/styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { postColumnThunk } from "src/features/column/column.slice";
import { DeleteXButton } from "../button/delete-x-button";
import { PrimaryButton } from "../button/primary-button";

const MainContainer = styled.div`
  display: grid;
  min-width: 15vw;
  @media screen and (max-width: 720px) {
    min-width: 20vw;
  }
`;

const DisplayContainer = styled.div`
  border-radius: 0.2em;
  padding: 0.5rem 2rem;
  width: 17em;
  display: grid;
  gap: 0.5rem;
  grid-auto-flow: column;
  align-items: center;
  justify-content: flex-start;
  color: ${colors.black(0.8)};
  background-color: ${colors.greyish(0.9)};
  cursor: pointer;
  :hover {
    background-color: ${colors.greyish()};
  }
`;

const EditContainer = styled.form`
  width: 17em;
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
          <Input placeholder="Enter title here..." {...register("title")} />
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
