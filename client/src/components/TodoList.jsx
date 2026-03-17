import { useMemo, useState } from "react";

function TodoList({ todos, completeTodo, deleteTodo, editTodo, isDark }) {
  const [editingId, setEditingId] = useState(null);
  const [draftText, setDraftText] = useState("");

  const editingTodo = useMemo(
    () => todos.find((t) => t._id === editingId) ?? null,
    [todos, editingId]
  );

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setDraftText(todo.body ?? "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraftText("");
  };

  const saveEdit = async () => {
    if (!editingTodo) return;
    const next = draftText.trim();
    if (!next) return;
    await editTodo(editingTodo._id, next);
    cancelEdit();
  };

  if (!todos?.length) {
    return <p className="text-center text-gray-500">No todos yet</p>;
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className={`flex justify-between items-center p-3 rounded-lg shadow-sm border ${
            isDark
              ? "bg-slate-700 border-slate-600"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex-1">
            {editingId === todo._id ? (
              <input
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isDark
                    ? "bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                aria-label="Edit todo"
              />
            ) : (
              <span
                className={`${
                  todo.completed
                    ? "line-through text-gray-400"
                    : isDark
                    ? "text-slate-100"
                    : "text-gray-800"
                }`}
              >
                {todo.body}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => completeTodo(todo._id)}
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              Done
            </button>
            {editingId === todo._id ? (
              <>
                <button
                  onClick={saveEdit}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => startEdit(todo)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => deleteTodo(todo._id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
