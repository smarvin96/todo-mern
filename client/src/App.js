import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Typography, Box } from '@mui/material';
import { useState, useEffect } from "react";

const API_BASE = "http://localhost:3001";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error: ", err));
  };


  const completeTodo = async id => {
    const data = await fetch(API_BASE + "/todo/complete/" + id).then(res => res.json());

    setTodos(todos => todos.map(todo => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;

      }));
  }



  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo
      })
    }).then(res => res.json());

    setTodos([...todos, data]);

    setPopupActive(false);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
  };

  return (
    <Box className="App">
      <Typography variant="h2">todo-list</Typography>
      <Typography variant="h6">Deine heutigen Herausforderungen</Typography>

      <Box className="todos">
        {todos.map((todo) => (
          <Box
            className={"todo " + (todo.complete ? "is-complete" : "")}
            key={todo._id}
            onClick={() => completeTodo(todo._id)}
          >
            <Box className="checkbox"></Box>
            <Box className="text">{todo.text}</Box>
            <Box className="delete-todo" onClick={() => deleteTodo(todo._id)}>
              x
            </Box>

            <Box className="addPopup" onClick={() => setPopupActive(true)}>
              +
            </Box>

            {popupActive ? (
              <Box className="popup">
                <Box
                  className="closePopup"
                  onClick={() => setPopupActive(false)}
                >
                  x
                </Box>
                <Box className="content">
                  <h3>Add task</h3>
                  <input
                    type="text"
                    className="add-todo-input"
                    onChange={(e) => setNewTodo(e.target.value)}
                    value={newTodo}
                  />
                  <Box className="button" onClick={addTodo}>
                    Create Task
                  </Box>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default App;
