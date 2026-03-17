# 📝 Go + React Todo App

A full-stack Todo application built using **Go (Fiber)** for backend and **React (Vite)** for frontend, with **MongoDB Atlas** as the database.

---

## 🚀 Features

* ✅ Create Todo
* 📋 Fetch all Todos
* ✏️ Edit Todo text
* ✅ Mark Todo as completed
* 🗑️ Delete Todo
* 🔍 Search Todos
* 🔄 Sort Todos (Newest / Oldest)
* 🧹 Clear completed Todos

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* CSS / Tailwind (optional)

### Backend

* Go (Fiber)
* MongoDB (official Go driver)

### Database

* MongoDB Atlas

---

## 📂 Project Structure

```
Go-react-todo/
│
├── backend/
│   ├── main.go
│   └── .env
│
├── client/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo

```
git clone https://github.com/mamta-kri06/Go-react-todo.git
cd Go-react-todo
```

---

### 2️⃣ Backend Setup

```
cd backend
go mod tidy
go run main.go
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

### 3️⃣ Frontend Setup

```
cd client
npm install
npm run dev
```

---

## 🌐 API Endpoints

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /api/todos     | Get all todos     |
| POST   | /api/todos     | Create new todo   |
| PATCH  | /api/todos/:id | Mark as completed |
| PUT    | /api/todos/:id | Update todo text  |
| DELETE | /api/todos/:id | Delete todo       |

---

## 🧠 Learnings

* Built REST APIs using Go Fiber
* Integrated MongoDB with Go
* Managed state in React
* Handled async API calls
* Implemented full CRUD functionality

