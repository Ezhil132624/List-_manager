import { Todo } from '../types/todo';

export const fetchTodos = async (dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    const enhancedTodos = data.slice(0, 10).map((todo: any) => ({
      ...todo,
      description: `Task description for ${todo.title}`,
    }));
    dispatch({ type: 'SET_TODOS', payload: enhancedTodos });
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch todos' });
  }
};

export const deleteTodo = async (id: number, dispatch: React.Dispatch<any>) => {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    });
    dispatch({ type: 'DELETE_TODO', payload: id });
  } catch (error) {
    console.error('Failed to delete todo:', error);
  }
};