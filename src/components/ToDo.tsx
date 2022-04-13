import { Categories, IToDos, todosState } from "../atoms";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

const Btn = styled.button`
  background-color: ${(props) => props.theme.accentColor};
  border: none;
  font-size: 10px;
  margin-left: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;

const DeleteBtn = styled(Btn)`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
`;

function ToDo({ text, category, id }: IToDos) {
  const setToDos = useSetRecoilState(todosState);
  const onClick = (newCategory: IToDos["category"]) => {
    setToDos((prevTodos) => {
      const targetIndex = prevTodos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      return [
        ...prevTodos.slice(0, targetIndex),
        newToDo,
        ...prevTodos.slice(targetIndex + 1),
      ];
    });
  };
  const DeleteTodo = () => {
    setToDos((prevTodos) => {
      const deleteToDo = prevTodos.filter((todo) => todo.category != category);
      return deleteToDo;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== "TO_DO" && (
        <Btn onClick={() => onClick(Categories.TO_DO)}>TODO</Btn>
      )}
      {category !== "DOING" && (
        <Btn onClick={() => onClick(Categories.DOING)}>DOING</Btn>
      )}
      {category !== "DONE" && (
        <Btn onClick={() => onClick(Categories.DONE)}>DONE</Btn>
      )}
      <DeleteBtn onClick={DeleteTodo}>X</DeleteBtn>
    </li>
  );
}

export default ToDo;
