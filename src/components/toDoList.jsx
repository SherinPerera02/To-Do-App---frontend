import toast from "react-hot-toast";

// Helper for relative time
function getRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

export default function TodoList({ todos, onToggle, onDelete, darkMode }) {
  if (todos.length === 0) {
    return (
      <div className={`text-center py-4 rounded-lg ${darkMode ? 'bg-gray-900' : ''}`}>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}> No tasks yet. Add your first one!</p>
      </div>
    );
  }

  return (
    <ul className={`space-y-3 rounded-lg p-2 ${darkMode ? 'bg-gray-900' : 'bg-indigo-200'}`}>
      {todos.map((todo) => (
        <li
          key={todo._id}
          className={`flex flex-col p-4 rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg animate-fade-in ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
        >
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                onToggle(todo._id);
                toast.success(
                  todo.completed ? " Marked as incomplete" : " Task completed!"
                );
              }}
              title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              <span className="text-xl">
                {todo.completed ? "✔️" : "⬜"}
              </span>
              <span
                className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}
              >
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => {
                onDelete(todo._id);
                toast(" Task deleted");
              }}
              className={`ml-4 px-3 py-1 rounded-md font-bold transition ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-900' : 'bg-red-400 text-white hover:bg-red-600'}`}
            >
              Delete
            </button>
          </div>

          {todo.createdAt && (
            <div className={`mt-2 text-sm flex flex-wrap items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}` }>
              <span className="inline-flex items-center gap-1">
                📅 {new Date(todo.createdAt).toLocaleDateString()}
              </span>
              <span className="inline-flex items-center gap-1">
                ⏰ {new Date(todo.createdAt).toLocaleTimeString()}
              </span>
              <span className={`${darkMode ? 'text-white' : 'text-gray-400'}`}>• {getRelativeTime(todo.createdAt)}</span>
              <span
                className={`ml-auto text-xs px-2 py-0.5 rounded-full font-semibold ${darkMode ? (todo.completed ? 'bg-indigo-900 text-indigo-300' : 'bg-gray-700 text-gray-300') : (todo.completed ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-700')}`}
              >
                {todo.completed ? "✅ Done" : "⏳ Pending"}
              </span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
