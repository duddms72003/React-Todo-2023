import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atoms";
import { styled } from "styled-components";
import { useEffect } from "react";

const Btn = styled.button`
  background: inherit;
  border: 0;
  box-shadow: none;
  border-radius: 5px;
  padding: 0;
  overflow: visible;
  cursor: pointer;
  background-color: #0b151e;
  color: #999;
  padding: 15px;
`;

interface IForm {
  bucketList: string;
}

function CreateTodo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();

  const saveToLocalStorage = (toDos: any) => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  };

  const handleValid = ({ bucketList }: IForm) => {
    const newToDo = { text: bucketList, id: Date.now(), category };
    setToDos((oldToDos) => [newToDo, ...oldToDos]);
    setValue("bucketList", "");

    const storedToDos = JSON.parse(localStorage.getItem("toDos") || "[]");
    saveToLocalStorage([...storedToDos, newToDo]);
  };

  useEffect(() => {
    const storedToDos = JSON.parse(localStorage.getItem("toDos") || "[]");
    setToDos(storedToDos);
  }, []);

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("bucketList", { required: "🐨 required! 🐨" })}
        placeholder="이름"
      />
      <span>{errors?.bucketList?.message}</span>
      <Btn type="submit">가자!</Btn>
    </form>
  );
}

export default CreateTodo;
