import { useRecoilState, useRecoilValue } from "recoil";
import CreateTodo from "./CreateToDo";
import ToDo from "./ToDo";
import { styled } from "styled-components";
import { toDoState } from "./atoms";

const Paragraph = styled.p`
  margin: 20px 0;
`;

const Btn = styled.button`
  background: inherit;
  border: 0;
  box-shadow: none;
  padding: 0;
  overflow: visible;
  cursor: pointer;
  background-color: #0b151e;
  padding: 5px 10px;
  display: inline-block;
  width: 50px;
  height: 50px;
  margin-left: 10px;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <Paragraph>내가 가고 싶은 나라들</Paragraph>

      <CreateTodo />

      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}

      <Paragraph>이미 가본 나라들</Paragraph>
      <Paragraph>좋아하는 나라들</Paragraph>
    </div>
  );
}

export default ToDoList;
