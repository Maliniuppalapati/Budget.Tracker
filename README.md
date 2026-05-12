# 🚀 AI-Powered Budget Planner

![Budget Planner Cover](https://img.shields.io/badge/MERN_Stack-Project-blue?style=for-the-badge&logo=react)
![AI Integrated](https://img.shields.io/badge/AI_Powered-Gemini-purple?style=for-the-badge&logo=google)


A highly responsive, full-stack personal finance management application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This project is designed to help users track their incomes and expenses, enforce budget limits, visualize their financial health, and receive **personalized AI-driven financial advice**.

---

## ✨ Enterprise-Grade Features

* 🔒 **Secure User Authentication:** Stateless authentication using JWT (JSON Web Tokens) and bcrypt password hashing.
* 💸 **Intelligent Expense Tracking:** Add, manage, and categorize expenses. The system automatically enforces a client & server-side check to prevent expenses from exceeding available balance.
* 🤖 **AI Smart Add (NLP):** Type natural language like *"Bought a coffee for 250"* and the integrated AI automatically extracts the amount and categorizes it correctly.
* 🧠 **AI Financial Advisor:** Powered by Google's Gemini LLM. It analyzes the user's spending habits across different categories and provides personalized, actionable financial advice.
* 🎯 **Dynamic Budget Goals:** Users have a monthly budget limit. A dynamic progress bar tracks usage and visually warns the user when they exceed 90% of their limit.
* 📊 **Interactive Data Visualization:** Implemented dynamic Pie and Line charts using Recharts to visualize income vs. expenses and category-wise spending.
* 📄 **Rich Data Export:** Generate and download highly formatted **PDF Reports** (via PDFKit) and **CSV Files** for Excel integration.
* 🎨 **Premium UI/UX:** A stunning, modern dark theme utilizing glassmorphism, smooth CSS animations, and gradient accents for a "wow" factor.

---

## 💻 Tech Stack

**Frontend:**
* React.js (Vite Build Tool)
* Context API / React Router DOM
* Recharts (Data Visualization)
* Axios (API Client)
* Vanilla CSS (Premium Dark Theme & Variables)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (ODM)
* `@google/generative-ai` (Gemini API Integration)
* `jsonwebtoken` & `bcryptjs` (Security)
* `pdfkit` (Report Generation)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
* Node.js (v16 or higher)
* MongoDB Atlas Account (or local MongoDB server)
* Google Gemini API Key (Optional: The application features a robust built-in local fallback, so AI features run flawlessly without an API key).

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<your_username>:<your_password>@<cluster_url>
   JWT_SECRET=your_super_secret_jwt_key
   ```
   *(Note: The `GEMINI_API_KEY` is entirely optional. If you choose not to provide a key, the application will safely bypass Google's API and seamlessly fall back to a built-in local heuristic algorithm. This ensures that the Smart Add and AI Advisor features will work instantly and perfectly for offline demos or interviews without needing external cloud access).*
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a second terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

---

## 🎯 Usage & Testing Guide
1. **Register** a new account on the landing page.
2. Use the **Smart Add** feature by typing a sentence like *"Purchased a new laptop for 45000"* and watch the AI auto-fill the forms.
3. Observe the **Budget Usage Progress Bar** change colors as you add expenses.
4. Click **"Get Personalized Advice"** to receive AI-generated financial tips based on your specific transaction history.
5. Export your data using the **Download PDF** and **Download CSV** buttons at the bottom of the dashboard.

---

## 🤝 Contact
Developed by **Geya Malini**. Designed to demonstrate proficiency in Full-Stack Development, UI/UX Design, and Modern AI Integrations.
