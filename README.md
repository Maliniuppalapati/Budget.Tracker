# 💰 Budget Planner: Personal Finance Tracker

Welcome to the Budget Planner repository! This is a full-stack web application designed to help users track their income and expenses, manage their monthly budget, and visualize financial trends through interactive charts.

## ✨ Features

This application provides a comprehensive set of tools for personal finance management:

* **User Authentication:** Secure registration and login using JWT (JSON Web Tokens).
* **Income & Expense Tracking:** Easily add, view, and delete detailed income and expense transactions (including amount, category/source, and notes).
* **Real-time Balance Check:** Prevents users from adding an expense if it exceeds their current available balance.
* **Interactive Dashboard:** Provides a clear overview of financial health with three types of charts:
    * **Income vs. Expense Pie Chart:** Comparison of total income and total expenses.
    * **Expenses by Category Pie Chart:** Visualization of spending proportion across different categories.
    * **Monthly Trend Line Chart:** Tracks the movement of income and expenses over time.
* **PDF Reporting:** Generate and download a detailed summary PDF report of all transactions.
* **Automated Summaries (Backend):** Includes a cron job to potentially send weekly spending summary emails (requires proper email configuration in `.env`).

## 💻 Tech Stack

The Budget Planner is built using the MERN stack and key data visualization libraries.

### Frontend
| Technology | Description |
| :--- | :--- |
| **React** | Core library for building the user interface. |
| **React Router** | For client-side routing and page navigation. |
| **Axios** | HTTP client for API requests. |
| **Recharts** | Powerful library used to generate the vibrant pie and line charts. |

### Backend
| Technology | Description | |
| :--- | :--- |
| **Node.js & Express** | Runtime environment and minimal web framework. |
| **MongoDB & Mongoose** | NoSQL database and MongoDB object modeling tool. |
| **JWT** | Used for secure, stateless user authentication. |
| **BcryptJS** | For hashing and securing user passwords. |
| **PDFKit** | Used to generate the detailed PDF financial reports. |
| **Node-Cron** | Schedules tasks like sending weekly summaries. |

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

* Node.js (version 14 or higher)
* MongoDB Atlas or local installation
* `npm` or `yarn`

### 1. Backend Setup (`/backend`)

1.  **Navigate** to the `backend` directory.
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```
3.  **Create `.env` file:** Create a file named `.env` in the root of the `/backend` directory and add your configuration variables:

    ```env
    MONGO_URI=<YOUR_MONGO_DB_CONNECTION_STRING>
    JWT_SECRET=<A_LONG_RANDOM_STRING>
    PORT=5000

    # Optional: For email cron job
    # EMAIL_USER=your_email@gmail.com
    # EMAIL_PASS=your_app_password
    ```

4.  **Start the server:**
    ```bash
    npm run dev 
    # The server will run on http://localhost:5000
    ```

### 2. Frontend Setup (`/frontend`)

1.  **Navigate** to the `frontend` directory.
    ```bash
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```
3.  **Start the client:**
    ```bash
    npm start
    # The application will open in your browser at http://localhost:3000
    ```

## 📝 Usage

1.  **Register** a new account on the `/register` page.
2.  **Log in** on the `/login` page.
3.  Navigate to the `/dashboard`.
4.  Use the **Add Income** and **Add Expense** cards to record your transactions.
5.  View your updated financial status, interactive charts, and transaction history immediately below.

---
