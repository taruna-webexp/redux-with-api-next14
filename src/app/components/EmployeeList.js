import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, createTodo, updateTodoAsync, deleteTodoAsync } from '../redux/actions';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state);
  
  // Local state for new and editing todo
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = () => {
    if (newTodo) {
      dispatch(createTodo({
        userId: 1, 
        title: newTodo, 
        completed: false
      }));
      setNewTodo('');
    }
  };

  const handleUpdate = () => {
    if (editingTodo && editTitle) {
      const updatedTodo = { ...editingTodo, title: editTitle };
      dispatch(updateTodoAsync(updatedTodo));
      setEditingTodo(null);
      setEditTitle('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodoAsync(id));
  };

  // Sort todos so that the most recently added ones appear at the top
  const orderedTodos = todos.slice().reverse();

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Todo List</h1>

      <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Todo</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo"
            className="flex-1 p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Todo
          </button>
        </div>
      </div>

      {editingTodo && (
        <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Edit Todo</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Edit todo title"
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
            >
              Update Todo
            </button>
          </div>
        </div>
      )}

      <ul className="list-disc pl-5 space-y-4">
        {orderedTodos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
            <span className="text-gray-800">{todo.title}</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingTodo(todo);
                  setEditTitle(todo.title);
                }}
                className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
