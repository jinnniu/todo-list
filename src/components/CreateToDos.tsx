import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, todosState } from "../atoms";
import styled from "styled-components";

const Input = styled.input`
  width: 300px;
  padding: 10px;
  border: 2px solid ${(props) => props.theme.accentColor};
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.textColor};
  }
`;

const Btn = styled.button`
  background-color: ${(props) => props.theme.accentColor};
  border: none;
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;

interface IForm {
  toDo: string;
}

function CreateToDos() {
  const setTodos = useSetRecoilState(todosState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setTodos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register("toDo", { required: "Please write down something" })}
        placeholder="Write down your To-Do"
      ></Input>
      <Btn>Add</Btn>
    </form>
  );
}

export default CreateToDos;
