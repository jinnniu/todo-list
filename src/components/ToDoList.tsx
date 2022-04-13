import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";
import React from "react";
import CreateToDos from "./CreateToDos";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: bold;
  margin: 30px;
  color: ${(props) => props.theme.accentColor};
`;

const SelectList = styled.select`
  border: none;
  background-color: ${(props) => props.theme.accentColor};
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const ToDoListItem = styled.ul`
  margin-top: 20px;
  li {
    margin: 10px;
    padding: 10px 100px;
    border-radius: 10px;
    color: ${(props) => props.theme.accentColor};
    border: 2px solid ${(props) => props.theme.accentColor};
    display: flex;
    align-items: center;
    span {
      margin-right: 30px;
      font-size: 20px;
    }
  }
`;

function ToDoList() {
  const todos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onCategoryInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <Container>
      <Title>To-Do List</Title>
      <>
        {/* <input placeholder="Add new category" />
        <button onClick={addCategory}>Add</button> */}
        <SelectList value={category} onInput={onCategoryInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </SelectList>
      </>
      <CreateToDos />
      <ToDoListItem>
        {todos?.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ToDoListItem>
    </Container>
  );
}

export default ToDoList;
