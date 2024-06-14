import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

const TodoList = ({ todos, onDelete, onEdit, onToggleComplete }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id)}
          />
          <span>{todo.text}</span>
          <div>
            <button onClick={() => onEdit(todo)} className="edit-button">
              <FaPen />
            </button>
            <button onClick={() => onDelete(todo.id)} className="delete-button">
              <FaTrash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
