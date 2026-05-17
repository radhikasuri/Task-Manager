# Full Stack Task Manager Application

---

## Project Overview

This is a full-stack Task Manager application that allows users to register, login, and manage their daily tasks efficiently. The application supports authentication and full CRUD (Create, Read, Update, Delete) operations.

The project is designed with a clean architecture, separation of concerns, and reusable components.

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Context API

### Backend

* Node.js
* Express.js
* MongoDB (or JSON Server)
* JWT Authentication

---

## Features

* User Registration & Login
* JWT-based Authentication
* Create, Read, Update, Delete Tasks
* Task Filtering (All / Completed / Pending)
* Search Functionality
* Reusable Components
* Environment-based Configuration

---

## Project Structure

### Frontend

```
frontend/
 ├── src/
 │   ├── api/              # API configuration & endpoints
 │   ├── components/       # Reusable UI components (TaskCard)
 │   ├── context/          # Global state (AuthContext)
 │   ├── pages/            # Pages (Login, Register, Dashboard, AddTask)
 │   ├── App.js            # Routing
 │   └── index.js          # Entry point
```

### Backend

```
backend/
 ├── routes/               # API routes
 ├── controllers/          # Business logic
 ├── models/               # Database schemas
 ├── middleware/           # Auth middleware
 └── server.js             # Entry point
```

---

## Setup Instructions

### 1. Clone Repository

```
git clone <git@github.com:radhikasuri/Task-Manager.git>
cd task-manager
```

---

### 2. Setup Backend

```
cd backend
npm install
npm start
```

---

### 3. Setup Frontend

```
cd frontend
npm install
npm start
```

---

##  Environment Variables

Create `.env` file in frontend:

```
REACT_APP_API_URL=http://localhost:5000
```

---

## How to Use the Application

1. Register a new account using the Signup page
2. Login with your credentials
3. After login, you will be redirected to the Dashboard
4. Click on **"Add Task"** to create a new task
5. Edit or delete tasks using action buttons
6. Use filter dropdown (All / Completed / Pending)
7. Use search to find tasks quickly

---

##  Application Flow

```
User → Register → Login → Receive JWT Token
→ Store Token in localStorage
→ Perform API Calls with Token

Dashboard → Fetch Tasks → Display Tasks
→ Filter / Search / Delete

AddTask → Create / Update Task → API Call → Backend → Database
```

---

##  Code Flow Explanation

### Authentication Flow

* User logs in → API call to backend
* Backend validates user → generates JWT token
* Token sent to frontend
* Stored in localStorage
* Used in all API requests

```
Authorization: Bearer <token>
```

---

### Task Flow

#### Fetch Tasks

* Dashboard calls API → GET /tasks
* Backend returns task list
* Stored in React state → rendered in UI

#### Create Task

* AddTask form → POST /tasks
* Backend saves task → returns response

#### Update Task

* Dynamic route `/updatetask/:id`
* Fetch existing task → pre-fill form
* PUT request updates task

#### Delete Task

* Click delete → DELETE /tasks/:id
* Task removed from UI state

---

## API Endpoints

### Auth APIs

* POST `/register` → Register user
* POST `/login` → Login user

### Task APIs

* POST `/tasks` → Create task
* GET `/tasks` → Get all tasks
* GET `/tasks/:id` → Get single task
* PUT `/tasks/:id` → Update task
* DELETE `/tasks/:id` → Delete task

---

## Authentication Details

* JWT-based authentication is implemented
* Token is stored in localStorage
* Sent in every API request header
* Backend middleware validates token before allowing access

---

##  Architecture Overview

```
Frontend (React UI)
        ↓
API Layer (Axios)
        ↓
Backend (Express Server)
        ↓
Database (MongoDB / JSON Server)
        ↓
Response → Frontend UI Update
```

---

##  Key Design Decisions

* Used **Context API** for global authentication instead of Redux for simplicity
* Reused **AddTask component** for both create and update functionality
* Centralized API handling using Axios
* Modular folder structure for scalability and maintainability
* Dynamic routing for task editing

---

## Live Application
 Frontend
https://task-manager-rouge-theta-35.vercel.app/login
 Backend 
 https://task-manager-e1p6.onrender.com


## Conclusion

This project demonstrates full-stack development capabilities including frontend architecture, backend API design, authentication, and clean code practices. It is structured for scalability and maintainability.

---

## 👩‍💻 Author

Radhika Suri
