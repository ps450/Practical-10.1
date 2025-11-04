import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

export default function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos
  useEffect(() => {
    axios.get("http://localhost:5000/api/todos")
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add todo
  const addTodo = async (text) => {
    const res = await axios.post("http://localhost:5000/api/todos", { text });
    setTodos([...todos, res.data]);
  };

  // Toggle completion
  const toggleTodo = async (id, completed) => {
    const res = await axios.put(`http://localhost:5000/api/todos/${id}`, { completed });
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div style={{ width: 400, margin: "50px auto", textAlign: "center" }}>
      <h1>📝 Todo Application</h1>
      <TodoForm addTodo={addTodo} />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        ))}
      </ul>
    </div>
  );
}
