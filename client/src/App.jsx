import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { getTodos, createTodo, completeTodo, deleteTodo, editText } from "./api";

function objectIdToUnixSeconds(id) {
  if (typeof id !== "string" || id.length < 8) return 0;
  const hex = id.slice(0, 8);
  const seconds = Number.parseInt(hex, 16);
  return Number.isFinite(seconds) ? seconds : 0;
}

function App() {
  const [todos, setTodos] = useState([]);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // newest | oldest
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem("todo_theme") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("todo_theme", isDark ? "dark" : "light");
    } catch {
      // ignore
    }
  }, [isDark]);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(Array.isArray(data) ? data : []);
    } catch {
      setTodos([]);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    await createTodo({ body: text, completed: false });
    fetchTodos();
  };

  const markComplete = async (id) => {
    await completeTodo(id);
    fetchTodos();
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const clearCompleted = async () => {
    const safeTodos = Array.isArray(todos) ? todos : [];
    const completedIds = safeTodos.filter((t) => t.completed).map((t) => t._id);
    if (!completedIds.length) return;
    await Promise.all(completedIds.map((id) => deleteTodo(id)));
    fetchTodos();
  };

  const todoEdit = async (id, newText) => {
    await editText(id, newText);
    fetchTodos();
  };

  const safeTodos = Array.isArray(todos) ? todos : [];
  const normalizedQuery = query.trim().toLowerCase();
  const filteredTodos = normalizedQuery
    ? safeTodos.filter((t) => (t.body ?? "").toLowerCase().includes(normalizedQuery))
    : safeTodos;

  const completedCount = safeTodos.filter((t) => t.completed).length;

  const visibleTodos = [...filteredTodos].sort((a, b) => {
    const aTs = objectIdToUnixSeconds(a?._id);
    const bTs = objectIdToUnixSeconds(b?._id);
    return sortOrder === "oldest" ? aTs - bTs : bTs - aTs;
  });

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-slate-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`shadow-xl rounded-xl p-8 w-105 ${
          isDark ? "bg-slate-800 text-slate-100" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Todo App</h1>
          <button
            type="button"
            onClick={() => setIsDark((v) => !v)}
            className={`px-3 py-2 rounded-lg border text-sm font-medium transition ${
              isDark
                ? "border-slate-600 hover:bg-slate-700"
                : "border-gray-300 hover:bg-gray-100"
            }`}
            aria-pressed={isDark}
          >
            {isDark ? "Light" : "Dark"}
          </button>
        </div>

        <TodoForm addTodo={addTodo} />

        <div className="mb-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks..."
              className={`w-full sm:flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isDark
                  ? "bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={`w-full sm:w-auto border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isDark
                  ? "bg-slate-900 border-slate-700 text-slate-100"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              aria-label="Sort tasks"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <button
              type="button"
              onClick={clearCompleted}
              disabled={completedCount === 0}
              className={`w-full sm:w-auto px-3 py-2 rounded-lg border text-sm font-medium transition ${
                completedCount === 0
                  ? "opacity-50 cursor-not-allowed"
                  : isDark
                  ? "border-slate-700 hover:bg-slate-700"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
              title={
                completedCount === 0
                  ? "No completed tasks"
                  : "Delete all completed tasks"
              }
            >
              Clear Completed
            </button>
          </div>
          {normalizedQuery ? (
            <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-gray-600"}`}>
              Showing {visibleTodos.length} of {todos.length}
            </p>
          ) : null}
        </div>

        <TodoList
          todos={visibleTodos}
          isDark={isDark}
          editTodo={todoEdit}
          completeTodo={markComplete}
          deleteTodo={removeTodo}
        />
      </div>
    </div>
  );
}

export default App;
