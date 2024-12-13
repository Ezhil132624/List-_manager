import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ListTodo, PlusCircle, LogIn } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className="flex items-center px-2 py-2 text-gray-700 hover:text-blue-600"
            >
              <ListTodo className="h-6 w-6 mr-2" />
              <span className="font-semibold text-xl">TodoMaster</span>
            </Link>
            
            <div className="hidden sm:flex sm:space-x-4">
              <Link
                to="/"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link
                to="/add"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/add')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Add Task
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};