import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { colors } from "src/utils/styles";
import { postCardThunk } from "src/features/card/card.slice";
import { DeleteXButton } from "../delete-x-button";

const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  border-radius: 0.2rem;
`;

const DisplayContainer = styled.div`
  padding: 0.5rem 0.3rem;
  width: fit-content;

  display: grid;
  gap: 0.5rem;
  border-radius: 0.2rem;
  grid-auto-flow: column;
  align-items: center;
  justify-content: flex-start;

  color: ${colors.black(0.8)};
  cursor: pointer;
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
  color: ${colors.white(0.8)};
  background-color: ${colors.black(0.4)};
  cursor: pointer;
`;

const FAIcon = styled(FontAwesomeIcon)`
  color: ${colors.black(0.6)};
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
  const [inputToggle, setInputToggle] = useState(true);

  const addCardHandler: SubmitHandler<FormInputs> = (data) => {
    dispatch(postCardThunk({ title: data.cardTitle, columnId }));
    reset();
    setInputToggle(true);
  };

  return inputToggle ? (
    <DisplayContainer onClick={() => setInputToggle(false)}>
      <FAIcon icon={faPlus} />
      <span>Add a Card</span>
    </DisplayContainer>
  ) : (
    <FormContainer onSubmit={handleSubmit(addCardHandler)}>
      <CardInput placeholder="Enter title here..." {...register("cardTitle")} />
      <FormActions>
        <FormButton>Add Card</FormButton>
        <DeleteXButton onClick={() => setInputToggle(true)} />
      </FormActions>
    </FormContainer>
  );
};
