import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, Pencil, Trash2 } from 'lucide-react';
import { Todo } from '../../types/todo';
import { useTodo } from '../../contexts/TodoContext';
import { deleteTodo } from '../../services/todoService';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const navigate = useNavigate();
  const { dispatch } = useTodo();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTodo(todo.id, dispatch);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
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
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/edit/${todo.id}`)}
            className="text-blue-500 hover:text-blue-600 transition-colors p-1"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 transition-colors p-1"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};