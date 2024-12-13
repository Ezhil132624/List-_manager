import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodo } from '../contexts/TodoContext';

export const EditTaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useTodo();
  const navigate = useNavigate();
  
  const todo = state.todos.find((t) => t.id === Number(id));
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setCompleted(todo.completed);
    }
  }, [todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!todo) return;

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: todo.id,
          title,
          description,
          completed,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      
      const data = await response.json();
      dispatch({
        type: 'UPDATE_TODO',
        payload: { ...data, description },
      });
      
      navigate('/');
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  if (!todo) {
    return <div>Task not found</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="completed" className="ml-2 block text-sm text-gray-700">
          Mark as completed
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};