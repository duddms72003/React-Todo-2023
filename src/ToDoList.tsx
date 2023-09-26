import { useRecoilState, useRecoilValue } from "recoil";
import CreateTodo from "./CreateToDo";
import ToDo from "./ToDo";
import { styled } from "styled-components";
import { Categories, toDoSelector, toDoState } from "./atoms";
import { useEffect, useState } from "react";

const Paragraph = styled.p`
  margin: 20px 0;
`;

const TodoContainer = styled.div`
  margin: 20px auto 20px auto;
  width: 300px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.button`
  padding: 15px;
  font-size: 14px;
  background-color: #0b151e;
  color: white;
  width: 200px;
  cursor: pointer;
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`;

const MainTitle = styled.h1`
  margin: 20px 0;
  font-weight: bold;
  font-size: 20px;
`;

function ToDoList() {
  const [toDo, doing, done] = useRecoilValue(toDoSelector);
  // const toDos = useRecoilValue(toDoState);
  // const [selectedCategory, setSelectedCategory] = useState(Categories.TO_DO);

  // const handleCategoryChange = (category: any) => {
  //   setSelectedCategory(category);
  // };

  // const filteredToDos = toDos.filter((toDo) => {
  //   if (selectedCategory === Categories.TO_DO) {
  //     return true;
  //   }
  //   return toDo.category === selectedCategory;
  // });

  // return (
  //   <div>
  //     <Paragraph>내가 가고 싶은 나라들</Paragraph>

  //     <CreateTodo />

  //     <TodoContainer>
  //       {filteredToDos?.map((toDo) => (
  //         <ToDo key={toDo.id} {...toDo} />
  //       ))}
  //     </TodoContainer>

  //     <Container>
  //       <Title onClick={() => handleCategoryChange(Categories.TO_DO)}>
  //         가고 싶은 나라들 전체
  //       </Title>
  //       <Title onClick={() => handleCategoryChange(Categories.DOING)}>
  //         이미 가본 나라들
  //       </Title>
  //       <Title onClick={() => handleCategoryChange(Categories.DONE)}>
  //         좋아하는 나라들
  //       </Title>
  //     </Container>
  //   </div>
  // );
  return (
    <div>
      <MainTitle>내가 가고싶은 나라들</MainTitle>

      <CreateTodo />

      <ul>
        {toDo.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>

      <MainTitle>내가 가본 나라들</MainTitle>
      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>

      <MainTitle>내가 좋아하는 나라들</MainTitle>
      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
