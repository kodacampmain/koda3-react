import { useContext, useState } from "react";
import { authContext } from "../contexts/auth/authContext";
// import { todoContext } from "../contexts/todo/todoContext";
import Paragraph from "../components/atoms/Paragraph";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
} from "../redux/slices/todoSlice";

function Todo() {
  const [show, setShow] = useState({
    status: false,
    mode: "add",
    idx: null,
    oldTitle: "",
  });
  const openModal = (isEdit, idx, oldTitle) => {
    setShow({
      status: true,
      mode: isEdit ? "edit" : "add",
      idx,
      oldTitle,
    });
  };
  const closeModal = () => {
    setShow((show) => {
      return { ...show, status: false };
    });
  };
  return (
    <>
      <Header />
      <section className="relative min-h-screen">
        <TodoList openModal={openModal} />
        <TodoForm
          isOpen={show.status}
          closeModal={closeModal}
          isEdit={show.mode === "add" ? false : true}
          idx={show.idx}
          oldTitle={show.oldTitle}
        />
      </section>
    </>
  );
}

function TodoList({ openModal }) {
  // const { state, dispatch } = useContext(todoContext);
  // const removeTodo = (todoTitle) => {
  //   dispatch({ type: "DELETE_TODO", value: todoTitle });
  // };
  // const toggleTodo = (todoTitle) => {
  //   dispatch({ type: "TOGGLE_TODO", value: todoTitle });
  // };
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  return (
    <>
      <div className="p-5">
        <button onClick={() => openModal(false)}>Add Todo</button>
      </div>
      <section className="grid grid-cols-3 gap-2.5 p-5">
        {todoState.todos.length === 0 && (
          <p>Todo masih kosong. Silahkan tambah todo dengan form disamping</p>
        )}
        {todoState.todos.length > 0 &&
          todoState.todos.map((todo, idx) => {
            return (
              <div
                className="relative cursor-pointer border-2 border-solid border-black p-1.25"
                key={idx}
              >
                <Paragraph
                  className="font-mysoul text-3xl text-red-500"
                  onClick={() => {
                    // console.log(todo.title);
                    openModal(true, idx, todo.title);
                  }}
                >
                  <span className="text-blue-500">Judul</span>
                  {todo.title}
                </Paragraph>
                <div
                  onClick={() => dispatch(toggleTodo({ idx }))}
                  className="cursor-pointer select-none"
                >
                  <p>{todo.isCompleted ? "Selesai" : "Belum Selesai"}</p>
                </div>
                <div
                  className="absolute top-0 right-0 cursor-pointer rounded-full bg-gray-300 p-1.25 select-none"
                  onClick={() => {
                    dispatch(deleteTodo({ idx }));
                  }}
                >
                  X
                </div>
              </div>
            );
          })}
      </section>
    </>
  );
}

function TodoForm({ isOpen, closeModal, isEdit, idx, oldTitle }) {
  // const { dispatch } = useContext(todoContext);
  // const addTodo = (todo) => {
  //   dispatch({ type: "ADD_TODO", value: todo });
  // };
  const dispatch = useDispatch();
  // console.log(isEdit, idx, oldTitle);
  return (
    <div
      className={`${isOpen || "hidden"} absolute inset-0 z-10 flex items-center justify-center bg-black/80`}
      onClick={closeModal}
    >
      <form
        className="relative z-20 flex flex-col gap-2.5 rounded-md bg-white p-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (isEdit) {
            dispatch(
              editTodo({
                newTitle: e.target.todo.value,
                idx,
              }),
            );
          } else {
            dispatch(
              addTodo({ title: e.target.todo.value, isCompleted: false }),
            );
          }
          // addTodo({ title: e.target.todo.value, isCompleted: false });
          e.target.todo.value = "";
          closeModal();
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          name="todo"
          placeholder={isEdit ? oldTitle : "Judul Todo"}
          className="border-2 border-solid border-black p-1.25"
        />
        <button className="cursor-pointer border-2 border-solid border-black p-1.25 select-none">
          {isEdit ? "Edit" : "Add"} Todo
        </button>
      </form>
    </div>
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
