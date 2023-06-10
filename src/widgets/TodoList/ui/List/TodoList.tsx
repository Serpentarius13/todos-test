import { useTodoStore } from "../../store/useTodoStore";
import AddTodo from "../../../../features/AddTodo/AddTodo";
import TodoItem from "../../../../entities/TodoItem/TodoItem";
import TodoListSwitcher from "../ListSwitcher/TodoListSwitcher";

export default function TodoList() {
  const store = useTodoStore();

  return (
    <section className="flex flex-col w-[42rem]  max-w-screen max-h-[60rem] overflow-y-auto gap-[2rem] shadowy  px-[1rem] ">
      <AddTodo handleAdd={store.addTodo} />
      <ul className="flex flex-col gap-[1rem] w-full   ">
        {store.currentTodos().map((t) => (
          <li key={t.id}>
            <TodoItem
              todo={t}
              handleDelete={store.removeTodo}
              handleComplete={store.completeTodo}
            />
          </li>
        ))}
      </ul>

      <TodoListSwitcher />
    </section>
  );
}
