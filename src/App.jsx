import { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/toDoList";
import { Toaster, toast } from "react-hot-toast";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) {
      toast.error("Please enter a task!");
      return;
    }
    const createdAt = new Date().toISOString();
    const res = await axios.post("http://localhost:5000/api/todos", { title, createdAt });
    setTodos([...todos, { ...res.data, createdAt }]);
    setTitle("");
    toast.success(" Task added!");
  };

  const toggleTodo = async (id) => {
    const res = await axios.put(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    if (res.data.completed) {
      toast.success;
    } else {
      toast;
    }
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
    toast;
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-950 to-gray-700' : 'bg-gradient-to-br from-indigo-300 to-pink-300'}`}
    >
      <Toaster position="top-center" />
      <div className={`rounded-2xl shadow-xl p-6 w-full max-w-md transition-all duration-300 border ${darkMode ? 'bg-gray-800 border-gray-800' : 'bg-indigo-100 border-gray-200'} animate-fade-in` }>
        <div className="flex  justify-between items-center mb-6">
          <h1 className={`text-3xl font-extrabold text-center ${darkMode ? 'text-gray-100' : 'text-indigo-700'}`}>To-Do App</h1>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className={`ml-4 px-3 py-1 rounded-lg font-bold transition border ${darkMode ? 'bg-gray-500 text-white border-gray-600' : 'bg-indigo-200 text-indigo-700 border-indigo-200'}`}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter new task..."
            className={`flex-grow px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition placeholder-gray-500 border ${darkMode ? 'bg-gray-800 text-white border-gray-700 focus:ring-indigo-500' : 'border-gray-300 focus:ring-indigo-300'}`}
            style={darkMode ? { backgroundColor: '#222', color: '#fff', borderColor: '#444', caretColor: '#fff' } : {}}
          />
          <button
            onClick={addTodo}
            className={`px-4 py-2 rounded-lg font-bold transition ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-800' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
          >
            Add
          </button>
        </div>

        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} darkMode={darkMode} />
      </div>
    </div>
  );
}
