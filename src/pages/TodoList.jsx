import { useContext } from "react";
import { authContext } from "../contexts/auth/authContext";
import { todoContext } from "../contexts/todo/todoContext";
import Paragraph from "../components/atoms/Paragraph";

function Todo() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-[1fr_300px]">
        <TodoList />
        <TodoForm />
      </div>
    </>
  );
}

function TodoList() {
  const { state, dispatch } = useContext(todoContext);
  const removeTodo = (todoTitle) => {
    dispatch({ type: "DELETE_TODO", value: todoTitle });
  };
  const toggleTodo = (todoTitle) => {
    dispatch({ type: "TOGGLE_TODO", value: todoTitle });
  };
  return (
    <section className="grid grid-cols-3 gap-2.5 p-5">
      {state.length === 0 && (
        <p>Todo masih kosong. Silahkan tambah todo dengan form disamping</p>
      )}
      {state.length > 0 &&
        state.map((todo, idx) => {
          return (
            <div
              className="relative cursor-pointer border-2 border-solid border-black p-1.25"
              key={idx}
            >
              <Paragraph>
                <span className="text-blue-500">Judul</span>
                {todo.title}
              </Paragraph>
              <div
                onClick={() => toggleTodo(todo.title)}
                className="cursor-pointer select-none"
              >
                <p>{todo.isCompleted ? "Selesai" : "Belum Selesai"}</p>
              </div>
              <div
                className="absolute top-0 right-0 cursor-pointer rounded-full bg-gray-300 p-1.25 select-none"
                onClick={() => {
                  removeTodo(todo.title);
                }}
              >
                X
              </div>
            </div>
          );
        })}
    </section>
  );
}

function TodoForm() {
  const { dispatch } = useContext(todoContext);
  const addTodo = (todo) => {
    dispatch({ type: "ADD_TODO", value: todo });
  };
  return (
    <form
      className="flex flex-col gap-2.5"
      onSubmit={(e) => {
        e.preventDefault();
        addTodo({ title: e.target.todo.value, isCompleted: false });
        e.target.todo.value = "";
      }}
    >
      <input
        type="text"
        name="todo"
        placeholder="Judul Todo"
        className="border-2 border-solid border-black p-1.25"
      />
      <button className="cursor-pointer border-2 border-solid border-black p-1.25 select-none">
        Add Todo
      </button>
    </form>
  );
}

function Header() {
  const { isLoggedIn, username, login, logout } = useContext(authContext);
  return (
    <header>
      {isLoggedIn || (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(e.target.username.value);
          }}
          className="px-5 py-2.5"
        >
          <input
            type="text"
            name="username"
            className="mr-1.25 border-2 border-solid border-black p-1.25"
          />
          <button className="cursor-pointer border-2 border-solid border-black p-1.25 select-none">
            Login
          </button>
        </form>
      )}
      {isLoggedIn && (
        <div className="flex gap-1.25 px-5 py-2.5">
          <p className="p-1.25">Welcome, {username}</p>
          <button
            onClick={logout}
            className="cursor-pointer border-2 border-solid border-black p-1.25 select-none"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Todo;
