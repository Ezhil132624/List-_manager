import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Todo, TodoState } from '../types/todo';
import { todoReducer } from '../reducers/todoReducer';
import { fetchTodos } from '../services/todoService';

const TodoContext = createContext<{
  state: TodoState;
  dispatch: React.Dispatch<any>;
} | null>(null);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    fetchTodos(dispatch);
  }, []);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};