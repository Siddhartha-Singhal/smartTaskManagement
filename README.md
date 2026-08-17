# 📋 Smart Task Management System

A full-stack web application for intelligent task management with AI-powered suggestions. Organize, prioritize, and manage your tasks efficiently with the help of AI-generated actionable breakdowns using Groq's advanced language models.

## ✨ Features

- **Task Management**: Create, read, update, and delete tasks
- **Task Organization**: Organize tasks by status (Pending/Completed), priority (Low/Medium/High), and category
- **Search & Filter**: Filter tasks by search keywords, status, and priority
- **AI Assistant**: Get AI-generated strategic breakdowns of complex objectives using Groq AI
- **Responsive Design**: Modern, mobile-friendly UI built with Bootstrap
- **Secure API**: JWT-based authentication with bcryptjs password hashing
- **Real-time Updates**: Instant task updates across the application

## 🏗️ Architecture

### Frontend
- **Framework**: React 19.2.8 with Vite 8.2.0
- **Styling**: Bootstrap 5.3.8 with Bootstrap Icons
- **HTTP Client**: Axios 1.19.0
- **Build Tool**: Vite with React plugin
- **Linting**: OxLint

### Backend
- **Runtime**: Node.js with Express 5.2.1
- **Database**: MongoDB with Mongoose 9.9.2
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Security**: bcryptjs 3.0.3 for password hashing
- **AI Integration**: Groq SDK 1.5.0 for AI suggestions
- **CORS**: Enabled for cross-origin requests
- **Environment**: dotenv 17.4.2

## 📂 Project Structure

```
smartTaskManagement/
├── backend/
│   ├── models/
│   │   └── Task.js              # Mongoose Task schema
│   ├── routes/
│   │   └── taskRoutes.js        # Express route handlers
│   ├── server.js                # Express server setup
│   ├── package.json             # Backend dependencies
│   └── .env                     # Environment variables (not in repo)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation component
│   │   │   ├── TaskForm.jsx     # Task creation/editing form
│   │   │   ├── TaskList.jsx     # Task display component
│   │   │   └── AiAssistant.jsx  # AI suggestion interface
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # React entry point
│   │   ├── index.css            # Global styles
│   │   ├── App.css              # App-specific styles
│   │   └── assets/              # Static assets
│   ├── public/                  # Public static files
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   └── index.html               # HTML entry point
└── package.json                 # Root package (monorepo)
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher
- **MongoDB**: Local or Atlas instance
- **Groq API Key**: For AI features (get from [groq.com](https://groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Siddhartha-Singhal/smartTaskManagement.git
   cd smartTaskManagement
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/smartTaskDb
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smartTaskDb

# Server Configuration
PORT=5000

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here
```

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend Server**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend Development Server**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Build

**Build Frontend**
```bash
cd frontend
npm run build
npm run preview
```

**Start Backend**
```bash
cd backend
npm start
```

## 📡 API Endpoints

### Health Check
- **GET** `/health` - Server health status

### Task Management
- **GET** `/api/tasks` - Fetch all tasks (supports query filters)
  - Query Parameters: `search`, `status`, `priority`
- **POST** `/api/tasks` - Create a new task
- **PUT** `/api/tasks/:id` - Update an existing task
- **DELETE** `/api/tasks/:id` - Delete a task

### AI Features
- **POST** `/api/tasks/ai-suggest` - Get AI-generated task suggestions
  - Body: `{ prompt: "Your objective" }`

## 💾 Database Schema

### Task Model
```javascript
{
  title: String (required),
  description: String,
  priority: String (enum: ['Low', 'Medium', 'High']),
  status: String (enum: ['Pending', 'Completed']),
  category: String,
  dueDate: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🎨 UI Components

- **Navbar**: Application header with branding
- **TaskForm**: Form for creating and editing tasks
- **TaskList**: Displays tasks with filtering options
- **AiAssistant**: Interface for AI-powered task suggestions powered by Groq

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS enabled for controlled cross-origin access
- Environment variable management for sensitive data

## 📦 Dependencies Summary

| Package | Version | Purpose |
|---------|---------|---------|
| Express | ^5.2.1 | Web framework (Backend) |
| Mongoose | ^9.9.2 | MongoDB ODM |
| Groq SDK | ^1.5.0 | AI integration |
| React | ^19.2.8 | Frontend framework |
| Vite | ^8.2.0 | Build tool |
| Bootstrap | ^5.3.8 | UI framework |
| Axios | ^1.19.0 | HTTP client |

## 🛠️ Available Scripts

### Backend
- `npm start` - Start the server
- `npm run dev` - Start with hot reload (nodemon)

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run linter
- `npm run preview` - Preview production build

## 🚀 Deployment

### Frontend Deployment
The project includes `vercel.json` for easy deployment to Vercel:
```bash
cd frontend
npm run build
# Deploy the dist/ folder to Vercel
```

### Backend Deployment
Deploy the backend to services like:
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean

Ensure to set environment variables on your hosting platform.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the project maintainer.

---

**Built with ❤️ by Siddhartha Singhal**

Last Updated: August 2026
