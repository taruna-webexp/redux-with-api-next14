//Action types
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

// Action creators return object contains type and payload
export const fetchTodosRequest = () => ({
  type: FETCH_TODOS_REQUEST,
});

export const fetchTodosSuccess = (todos) => ({

  type: FETCH_TODOS_SUCCESS,
  payload: todos,
});

export const fetchTodosFailure = (error) => ({
  type: FETCH_TODOS_FAILURE,
  payload: error,
});

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const updateTodo = (todo) => ({
  type: UPDATE_TODO,
  payload: todo,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

// Async actions
export const fetchTodos = () => {
  return async (dispatch) => {
    dispatch(fetchTodosRequest());
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      dispatch(fetchTodosSuccess(data));
    } catch (error) {
      dispatch(fetchTodosFailure(error.message));
    }
  };
};

export const createTodo = (todo) => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      dispatch(addTodo(data));
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };
};

export const updateTodoAsync = (todo) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      dispatch(updateTodo(data));
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };
};

export const deleteTodoAsync = (id) => {
  return async (dispatch) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      dispatch(deleteTodo(id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };
};
