import React from 'react';
import { CheckCircle2, Circle, Pencil } from 'lucide-react';
import { useTodo } from '../contexts/TodoContext';
import { useNavigate } from 'react-router-dom';

export const TodoList: React.FC = () => {
  const { state } = useTodo();
  const navigate = useNavigate();

  if (state.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="text-red-500 text-center p-4">
        {state.error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {state.todos.map((todo) => (
        <div
          key={todo.id}
          className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <button
                onClick={() => navigate(`/edit/${todo.id}`)}
                className={`mt-1 ${todo.completed ? 'text-green-500' : 'text-gray-400'}`}
              >
                {todo.completed ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <Circle className="h-6 w-6" />
                )}
              </button>
              <div>
                <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {todo.title}
                </h3>
                <p className="text-gray-600 mt-1">{todo.description}</p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/edit/${todo.id}`)}
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              <Pencil className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};