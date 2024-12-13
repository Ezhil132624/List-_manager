import React from 'react';
import { useTodo } from '../../contexts/TodoContext';
import { TodoItem } from './TodoItem';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const TodoList: React.FC = () => {
  const { state } = useTodo();

  if (state.loading) {
    return <LoadingSpinner />;
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
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};