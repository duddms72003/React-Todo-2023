import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { Categories, IToDo, toDoState } from "./atoms";
import { useEffect } from "react";

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

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const saveToLocalStorage = (data: IToDo[]) => {
    localStorage.setItem("toDos", JSON.stringify(data));
  };

  const toDos = useRecoilValue(toDoState); // 이 부분을 추가합니다.

  useEffect(() => {
    // 페이지가 로드될 때 로컬 스토리지에서 데이터 불러오기
    const storedToDos = JSON.parse(localStorage.getItem("toDos") || "[]");
    setToDos(storedToDos);
  }, []); // 빈 의존성 배열로 한 번만 실행되도록 설정

  useEffect(() => {
    // 데이터가 변경될 때 로컬 스토리지에 저장
    saveToLocalStorage(toDos);
  }, [toDos]);

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <Btn name={Categories.DOING} onClick={onClick}>
          ✅
        </Btn>
      )}

      {category !== Categories.TO_DO && (
        <Btn name={Categories.TO_DO} onClick={onClick}>
          👎🏻
        </Btn>
      )}

      {category !== Categories.DONE && (
        <Btn name={Categories.DONE} onClick={onClick}>
          ❌
        </Btn>
      )}
    </li>
  );
}

export default ToDo;
