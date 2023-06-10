export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export type TTodoID = ITodo["id"];
