import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ITodo, TTodoID } from "../../../shared/types/todo.types";

export const categorySettings = {
  all: "All",
  active: "Active",
  completed: "Completed",
} as const;

export type TCategoryKey = keyof typeof categorySettings;
interface ITodoStore {
  todos: ITodo[];

  addTodo: (text: string) => void;
  completeTodo: (id: TTodoID) => void;
  removeTodo: (id: TTodoID) => void;

  currentCategory: TCategoryKey;
  currentTodos: () => ITodo[];
  setCategory: (key: TCategoryKey) => void;

  clearCompleted: () => void;
}

const makeTodo = (text: string): ITodo => {
  const id = Math.random() * Date.now();

  return { id, text, completed: false };
};

export const useTodoStore = create<ITodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      currentCategory: "all",

      addTodo(text: string) {
        const todo = makeTodo(text);
        const prevTodos = get().todos;
        set({ todos: [...prevTodos, todo] });
      },

      completeTodo(id: TTodoID) {
        const nextTodos = get().todos.map((t) => {
          if (t.id === id) return { ...t, completed: !t.completed };

          return t;
        });

        set({ todos: nextTodos });
      },

      removeTodo(id: TTodoID) {
        const nextTodos = get().todos.filter((t) => t.id !== id);

        set({ todos: nextTodos });
      },

      setCategory(key: TCategoryKey) {
        set({ currentCategory: key });
      },

      currentTodos() {
        const todos = get().todos;

        const currentCategory = get().currentCategory;

        switch (currentCategory) {
          case "all":
            return todos;
          case "active":
            return todos.filter((t) => !t.completed);
          case "completed":
            return todos.filter((t) => t.completed);
        }
      },

      clearCompleted() {
        const prevTodos = get().todos;

        const nextTodos = prevTodos.filter((t) => !t.completed);

        set({ todos: nextTodos });
      },
    }),
    {
      name: "todo-storage",
    }
  )
);
