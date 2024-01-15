import "./App.css";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, todoState] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const deleteToDo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleCheckboxChange = (id, checked) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: checked } : todo
      )
    );
  };

  const handleAdd = () => {
    const trimmedTodo = todo.trim();
    if (trimmedTodo !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: trimmedTodo, status: false },
      ]);
      todoState("");
      setErrorMessage("");
    } else {
      setErrorMessage("please enter your todo list");
    }
  };

  const today = new Date();
  const options = { weekday: "long" };
  const formattedDay = today.toLocaleDateString(undefined, options);

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>{`Whoop, it's ${formattedDay} 🌝 ☕ `}</h2>
      </div>

      <div className="input">
        <input
          value={todo}
          onChange={(event) => todoState(event.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />

        <i onClick={handleAdd} className="fas fa-plus"></i>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div className="todos">
        {todos.map((value) => (
          <div className="todo" key={value.id}>
            <div className="left">
              <input
                onChange={(e) =>
                  handleCheckboxChange(value.id, e.target.checked)
                }
                checked={value.status}
                type="checkbox"
                name=""
                id=""
              />
              <p
                style={{
                  textDecoration: value.status ? "line-through" : "none",
                }}
              >
                {value.text}
              </p>
            </div>

            <div className="right">
              <i
                onClick={() => deleteToDo(value.id)}
                className="fas fa-times"
              ></i>
            </div>
          </div>
        ))}
      </div>

      {todos.map((value) => {
        if (value.status) {
          return <h1 key={value.id}>{value.text}</h1>;
        }
        return null;
      })}
    </div>
  );
}

export default App;
