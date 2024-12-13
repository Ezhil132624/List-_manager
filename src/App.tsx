import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoProvider } from './contexts/TodoContext';
import { Navbar } from './components/layout/Navbar';
import { TodoList } from './components/todo/TodoList';
import { AddTaskForm } from './components/AddTaskForm';
import { EditTaskForm } from './components/EditTaskForm';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <TodoProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">My Tasks</h1>
                    <TodoList />
                  </div>
                }
              />
              <Route
                path="/add"
                element={
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Task</h1>
                    <AddTaskForm />
                  </div>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Task</h1>
                    <EditTaskForm />
                  </div>
                }
              />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;