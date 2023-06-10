import { X,  Check } from "lucide-react";
import { ITodo, TTodoID } from "../../shared/types/todo.types";

import { useCallback } from "react";

interface ITodoItem {
  todo: ITodo;
  handleDelete: (id: TTodoID) => void;
  handleComplete: (id: TTodoID) => void;
}

interface ITodoButton {
  children: React.ReactNode;
  onClick: () => void;
  testName: string;
}

const TodoButton = ({ children, onClick, testName }: ITodoButton) => {
  return (
    <button
      className="opacity-0 flex items-center  aspect-square group-hover:opacity-100 transition-all"
      onClick={onClick}
      data-cy={testName}
    >
      {children}
    </button>
  );
};

export default function TodoItem(props: ITodoItem) {
  const {
    todo: { id, completed, text },
    handleDelete,
    handleComplete,
  } = props;

  const deleteTodo = useCallback(() => {
    handleDelete(id);
  }, [id, handleDelete]);

  const completeTodo = useCallback(() => {
    handleComplete(id);
  }, [id, handleComplete]);

  return (
    <div className="w-full flex justify-between items-center group py-6 px-3  " data-cy="todo-item">
      <div className="group text-[1.6rem] font-bold flex gap-3 w-full items-center ">
        <TodoButton onClick={completeTodo} testName="complete-todo">
          <Check color="green" />
        </TodoButton>
        <p className={`${completed ? "text-gray-500 line-through" : ""}`}>
          {text}
        </p>
      </div>

      <TodoButton onClick={deleteTodo} testName="remove-todo">
        <X color="red" />
      </TodoButton>
    </div>
  );
}
