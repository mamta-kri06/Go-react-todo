const BASE_URL = "https://go-react-todo-1.onrender.com" ?? "http://localhost:5000";
const API = `${BASE_URL}/api/todos`;

export const getTodos = async () => {
  const res = await fetch(API);
  return res.json();
};

export const createTodo = async (todo) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return res.json();
};

export const completeTodo = async (id) => {
  await fetch(`${API}/${id}`, {
    method: "PATCH",
  });
};

export const deleteTodo = async (id) => {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
};

export const editText = async (id, body) => {
  const res = await fetch(`${API}/text/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body }),
  });
  return res.json();
};
