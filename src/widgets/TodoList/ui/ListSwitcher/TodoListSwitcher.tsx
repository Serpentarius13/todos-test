import {
  categorySettings,
  useTodoStore,
  TCategoryKey,
} from "../../store/useTodoStore";

export default function TodoListSwitcher() {
  const setCategory = useTodoStore((state) => state.setCategory);

  const currentCategory = useTodoStore((state) => state.currentCategory);

  const todos = useTodoStore((state) => state.currentTodos);

  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  return (
    <footer className="w-full border-t-[1px] border-gray-400 p-[1rem] flex justify-between items-center text-[1.2rem]">
      <span>{todos().length} items left</span>

      <nav className="flex items-center gap-[1rem] child:p-[0.4rem]">
        {Object.keys(categorySettings).map((k) => (
          <button
            onClick={() => setCategory(k as TCategoryKey)}
            className={k === currentCategory ? "border-[1px] border-black" : ""}
            key={k}
          >
            {categorySettings[k as TCategoryKey]}
          </button>
        ))}
      </nav>

      <button onClick={clearCompleted}>Clear completed</button>
    </footer>
  );
}
