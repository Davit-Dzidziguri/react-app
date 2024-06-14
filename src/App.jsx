import React, { useState } from 'react';
import { FaPlus, FaRegMoon, FaSun } from 'react-icons/fa';
import Modal from 'react-modal';
import './App.scss';
import TodoList from './TodoList';


Modal.setAppElement('#root');

const App = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [newTodo, setNewTodo] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const openModal = (todo = null) => {
    setCurrentTodo(todo);
    setNewTodo(todo ? todo.text : '');
    setIsOpen(true);
  };

  const closeModal = () => {
    setCurrentTodo(null);
    setNewTodo('');
    setIsOpen(false);
  };

  const addOrUpdateTodo = () => {
    if (currentTodo) {
      setTodos(todos.map(todo => (todo.id === currentTodo.id ? { ...todo, text: newTodo } : todo)));
    } else {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    }
    closeModal();
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = id => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'app dark-mode' : 'app'}>
      <h1>Todo List</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search note..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={isDarkMode ? 'dark-mode' : ''}
        />
        <button onClick={() => openModal()} className="icon-button">
          <FaPlus />
        </button>
        <button onClick={toggleDarkMode} className="switch-button">
          {isDarkMode ? <FaSun /> : <FaRegMoon />}
        </button>
      </div>
      <TodoList todos={filteredTodos} onDelete={deleteTodo} onEdit={openModal} onToggleComplete={toggleComplete} />

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <h1 className="modal-title">{currentTodo ? 'EDIT NOTE' : 'NEW NOTE'}</h1>
        <input type="text" className="modal-input" placeholder='Input your note...' value={newTodo} onChange={e => setNewTodo(e.target.value)} />
        <div className="modal-buttons">
          <button className="modal-button cancel-button" onClick={closeModal}>CANCEL</button>
          <button className="modal-button" onClick={addOrUpdateTodo}>{currentTodo ? 'APPLY' : 'APPLY'}</button>
          
        </div>
      </Modal>
    </div>
  );
};

export default App;
