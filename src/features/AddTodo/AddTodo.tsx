import { useCallback, useRef } from "react";

interface IAddTodo {
  handleAdd: (text: string) => void;
}

export default function AddTodo(props: IAddTodo) {
  const { handleAdd } = props;

  const input = useRef<HTMLInputElement | null>(null);

  const createTodo = useCallback(() => {
    if (!input.current) return;

    const { value: text } = input.current;

    if (!text) return alert("Введите туду");

    handleAdd(text);

    input.current.value = "";
  }, [handleAdd, input]);

  return (
    <div
      className="w-full flex gap-8  text-[1.6rem]"
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") createTodo();
      }}
    >
      <input
        type="text"
        className="px-8 py-4 rounded-sm bg-white border-2 border-orange-300 flex-1"
        ref={input}
      />

      <button
        className="px-8 py-4 bg-orange-300 text-white rounded-sm hover:bg-white transition-all hover:text-orange-300 border-2 hover:border-orange-300"
        onClick={createTodo}
      >
        Создать туду
      </button>
    </div>
  );
}
