import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { colors } from "src/utils/styles";
import { postCardThunk } from "src/features/card/card.slice";
import { PrimaryButton } from "../common-button/primary-button";

const DisplayContainer = styled.div`
  padding: 0.5rem 0.3rem;

  display: grid;
  gap: 0.5rem;
  border-radius: 0.2rem;
  grid-auto-flow: column;
  align-items: center;
  justify-content: flex-start;

  cursor: pointer;
`;

const FormContainer = styled.form`
  display: grid;
  gap: 1rem;
`;

const CardInput = styled.input`
  box-shadow: 0 0 1rem #ddd;
  border-radius: 0.5rem;
  padding: 1em 1.1em;
  width: 18rem;

  font-size: 1rem;
  line-height: 1.3em;
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

interface NewCardProps {
  columnId: number;
}

type FormInputs = {
  cardTitle: string;
};

export const NewCard = ({ columnId }: NewCardProps) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm<FormInputs>();
  const [showForm, setShowForm] = useState(true);

  const addCardHandler: SubmitHandler<FormInputs> = (data) => {
    dispatch(postCardThunk({ title: data.cardTitle, columnId }));
    reset();
    setShowForm(true);
  };

  return showForm ? (
    <DisplayContainer onClick={() => setShowForm(false)}>
      <FAIcon icon={faPlus} />
      <span>Add a Card</span>
    </DisplayContainer>
  ) : (
    <FormContainer onSubmit={handleSubmit(addCardHandler)}>
      <CardInput
        type="text"
        placeholder="Enter a title here"
        {...register("cardTitle")}
        required
      />
      <FormActions>
        <PrimaryButton text="Add" style={{ padding: "0.5em 2em" }} />
        <CancelButton onClick={() => setShowForm(true)}>Cancel</CancelButton>
      </FormActions>
    </FormContainer>
  );
};
