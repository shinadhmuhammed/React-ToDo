import "./App.css";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editTodo, seteditTodo] = useState(null);
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



  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.text);
      seteditTodo(id);
    }
  };




  const handleSaveEdit = () => {
    const trimmedTodo = todo.trim();
    if (trimmedTodo !== "") {
      setTodos((prevTodos) =>
        prevTodos.map((prevTodo) =>
          prevTodo.id === editTodo
            ? { ...prevTodo, text: trimmedTodo }
            : prevTodo
        )
      );
      setTodo("");
      seteditTodo(null);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter your todo list");
    }
  };



  const handleAdd = () => {
    const trimmedTodo = todo.trim();
    if (trimmedTodo !== "") {
      const isDuplicate = todos.some((item) => item.text === trimmedTodo);

      if (!isDuplicate) {
        setTodos([
          ...todos,
          { id: Date.now(), text: trimmedTodo, status: false },
        ]);
        setTodo("");
        setErrorMessage("");
      } else {
        setErrorMessage("Duplicate item. Please enter a unique todo.");
      }
    } else {
      setErrorMessage("Please enter your todo list");
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
          onChange={(event) => setTodo(event.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />



        {editTodo === null ? (
          <i onClick={handleAdd} className="fas fa-plus"></i>
        ) : (
          <i onClick={handleSaveEdit} className="fas fa-check"></i>
        )}
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
                onClick={() => handleEdit(value.id)}
                className="fas fa-edit"
              ></i>
              <i
                onClick={() => deleteToDo(value.id)}
                className="fas fa-times"
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
