import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { drelloColors } from "src/utils/colors";
import { addCard } from "src/redux/domain/card";

const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  border-radius: 0.2rem;
`;

const DisplayContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  border-radius: 0.2rem;
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
    /* TODO: Implement add Card function */
    data.cardTitle.length > 0 &&
      dispatch(addCard({ title: data.cardTitle, columnId }));
    reset();
    setInputToggle(true);
    console.log("Implement function to addCard ideally with redux");
  };

  return inputToggle ? (
    <DisplayContainer onClick={() => setInputToggle(false)}>
      <FAIcon icon="plus" />
      <span>Add a Card</span>
    </DisplayContainer>
  ) : (
    <FormContainer onSubmit={handleSubmit(addCardHandler)}>
      <CardInput placeholder="Enter title here..." {...register("cardTitle")} />
      <FormActions>
        <FormButton>Add Card</FormButton>
        <FAIcon icon="times" onClick={() => setInputToggle(true)} />
      </FormActions>
    </FormContainer>
  );
};
