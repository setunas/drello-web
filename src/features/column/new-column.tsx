import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { colors } from "src/utils/styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { postColumnThunk } from "src/features/column/column.slice";
import { PrimaryButton } from "../common-button/primary-button";
import { AppThunkDispatch } from "src/utils/redux/store";

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

  background-color: ${colors.backgroundSub};
  color: ${colors.textBold};
  cursor: pointer;
`;

const EditContainer = styled.form`
  border-radius: 0.5rem;
  padding: 1rem;
  width: 20rem;
  height: fit-content;

  display: grid;
  gap: 1rem;
  background-color: ${colors.backgroundSub};
`;

const Input = styled.input`
  font-size: 1.2rem;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
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
  margin-right: 0.3rem;
  color: ${colors.textPlain};
  cursor: pointer;
`;

interface FormInputs {
  title: string;
}

interface NewColumnProps {
  boardId: number;
}

export const NewColumn = ({ boardId }: NewColumnProps) => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const { register, handleSubmit, reset } = useForm<FormInputs>();
  const [showForm, setShowForm] = useState(true);
  const [showFormAction, setShowFormAction] = useState(true);

  const addColumnHandler: SubmitHandler<FormInputs> = (data) => {
    if (!showFormAction) return;

    setShowFormAction(false);
    dispatch(postColumnThunk({ title: data.title, boardId }))
      .unwrap()
      .finally(() => {
        reset();
        setShowForm(true);
        setShowFormAction(true);
      });
  };

  return showForm ? (
    <DisplayContainer onClick={() => setShowForm(false)}>
      <FAIcon icon={faPlus} />
      <span>Add a Column</span>
    </DisplayContainer>
  ) : (
    <EditContainer onSubmit={handleSubmit(addColumnHandler)}>
      <Input
        type="text"
        placeholder="Enter a title here"
        {...register("title")}
        required
      />
      {showFormAction && (
        <FormActions>
          <PrimaryButton text="Add" style={{ padding: "0.5em 2em" }} />
          <CancelButton onClick={() => setShowForm(true)}>Cancel</CancelButton>
        </FormActions>
      )}
    </EditContainer>
  );
};
