import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ITodo, TTodoID } from "../../../shared/types/todo.types";

interface ITodoStore {
  todos: ITodo[];

  addTodo: (text: string) => void;

  completeTodo: (id: TTodoID) => void;

  removeTodo: (id: TTodoID) => void;
}

const makeTodo = (text: string): ITodo => {
  const id = Math.random() * Date.now();

  return { id, text, completed: false };
};

export const useBearStore = create<ITodoStore>()(
  persist(
    (set, get) => ({
      todos: [],

      addTodo(text: string) {
        const todo = makeTodo(text);
        const prevTodos = get().todos;
        set({ todos: [...prevTodos, todo] });
      },

      completeTodo(id: TTodoID) {
        const nextTodos = get().todos.map((t) => {
          if (t.id === id) return { ...t, completed: true };

          return t;
        });

        set({ todos: nextTodos });
      },

      removeTodo(id: TTodoID) {
        const nextTodos = get().todos.filter((t) => t.id !== id);

        set({ todos: nextTodos });
      },
    }),
    {
      name: "food-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
