import TodoList from "../widgets/TodoList/ui/List/TodoList";

export default function Home() {
  return (
    <main className="w-screen h-screen flex items-center justify-center flex-col gap-[1rem] bg-white ">
      <h1 className="text-[6rem] text-orange-300 text-center  font-extralight">
        todos 
      </h1>
      <TodoList />
    </main>
  );
}
