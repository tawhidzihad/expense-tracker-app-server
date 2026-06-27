# 🚀 Expense Tracker Server

A RESTful backend API for the **Expense Tracker App** built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**. It provides CRUD operations, category-based filtering, pagination, expense summaries, and analytics for the frontend application.

---

## 🌐 Live API

**Base URL**

https://expense-tracker-server-ruddy.vercel.app/

---

## 📂 Source Code

### Server Repository

https://github.com/tawhidzihad/expense-tracker-app-server

### Client Repository

https://github.com/tawhidzihad/expense-tracker-app

---

# ✨ Features

- ➕ Create new expense
- 📄 Get all expenses
- ✏️ Update existing expense
- 🗑️ Delete expense
- 🔍 Filter expenses by category
- 📑 Server-side pagination
- 📊 Category-wise expense summary
- 💰 Calculate total expense amount
- ⚡ Fast MongoDB aggregation
- 🧩 RESTful API architecture
- 🌍 CORS enabled
- 🔒 Environment variable support
- 🛠️ Built with TypeScript

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- MongoDB

## Environment

- dotenv

## Middleware

- CORS
- Express JSON Parser

---

# 📁 Project Structure

```text
src/
│
├── index.ts
├── types.ts
└── ...
```

---

# ⚙️ Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
PORT=8080
DATABASE_URI=your_mongodb_connection_string
```

---

# 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/tawhidzihad/expense-tracker-app-server.git
```

### Navigate to the project

```bash
cd expense-tracker-app-server
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file:

```env
PORT=8080
DATABASE_URI=your_mongodb_connection_string
```

### Start the development server

```bash
npm run dev
```

Server will run on:

```text
http://localhost:8080
```

---

# 📦 Available Scripts

Start development server

```bash
npm run dev
```

Compile TypeScript

```bash
npm run build
```

Run production server

```bash
npm run start
```

---

# 📌 API Endpoints

| Method | Endpoint           | Description                                  |
| ------ | ------------------ | -------------------------------------------- |
| GET    | `/`                | Server health check                          |
| GET    | `/api/expense`     | Get all expenses with pagination & filtering |
| POST   | `/api/expense`     | Create a new expense                         |
| PATCH  | `/api/expense/:id` | Update an expense                            |
| DELETE | `/api/expense/:id` | Delete an expense                            |

---

# 🔍 Query Parameters

### Get Expenses

```http
GET /api/expense?page=1&limit=6&category=Food
```

| Parameter | Description                 |
| --------- | --------------------------- |
| page      | Current page number         |
| limit     | Number of expenses per page |
| category  | Filter by expense category  |

---

# 📤 Sample Response

```json
{
	"success": true,
	"message": "Expenses fetched successfully.",
	"data": {
		"expenses": [],
		"pagination": {
			"currentPage": 1,
			"totalPages": 1,
			"totalExpenses": 0,
			"limit": 6
		},
		"summary": {
			"totalExpenseAmount": 0,
			"categorySummary": []
		}
	}
}
```

---

# 🔮 Future Improvements

- JWT Authentication
- User-specific expenses
- Search by title
- Sorting by amount/date
- Monthly & yearly analytics
- Export API (CSV/PDF)
- Rate limiting
- Request validation middleware

---

# 👨‍💻 Author

**Md Tawhidul Islam Zihad**

LinkedIn: https://www.linkedin.com/in/tawhidulislamzihad
