import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [nameInputText, setNameInputText] = useState('');
  const [emailInputText, setEmailInputText] = useState('');
  const [ageInputText, setAgeInputText] = useState('');
  const [imgUrlInputText, setImgUrlInputText] = useState('');
  const [todoList, setTodoList] = useState(() => {
    const storedTodoList = localStorage.getItem('todoList');
    return storedTodoList ? JSON.parse(storedTodoList) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const handleAdd = () => {
    if (
      inputText.trim() !== '' &&
      nameInputText.trim() !== '' &&
      emailInputText.trim() !== '' &&
      ageInputText.trim() !== '' &&
      imgUrlInputText.trim() !== '' &&
      isValidUrl
    ) {
      const newTodo = {
        email: emailInputText,
        name: nameInputText,
        surname: inputText,
        age: ageInputText,
        imgUrl: imgUrlInputText,
      };
      setTodoList([...todoList, newTodo]);
      clearInputs();
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const todo = todoList[index];
    setInputText(todo.surname);
    setNameInputText(todo.name);
    setEmailInputText(todo.email);
    setAgeInputText(todo.age);
    setImgUrlInputText(todo.imgUrl);
  };

  const handleDelete = (index) => {
    const newList = [...todoList];
    newList.splice(index, 1);
    setTodoList(newList);
    if (editIndex === index) {
      clearInputs();
      setEditIndex(null);
    }
  };

  const handleUpdate = (index) => {
    if (isValidUrl) {
      const newTodo = {
        email: emailInputText,
        name: nameInputText,
        surname: inputText,
        age: ageInputText,
        imgUrl: imgUrlInputText,
      };
      const newList = [...todoList];
      newList[index] = newTodo;
      setTodoList(newList);
      clearInputs();
      setEditIndex(null);
    }
  };

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const handleUrlValidation = (url) => {
    const isValid = /^(ftp|http|https):\/\/[^ "]+$/.test(url) && (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    setIsValidUrl(isValid);
    return isValid;
  };

  const clearInputs = () => {
    setInputText('');
    setNameInputText('');
    setEmailInputText('');
    setAgeInputText('');
    setImgUrlInputText('');
    setIsValidUrl(true);
  };

  return (
    <div className='todos'>
      <div className='todo__input'>
        <div>
          <label>Familiya kiriting</label>
          <input
            type='text'
            value={inputText}
            placeholder='Familiya kiriting'
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div>
          <label>Ism kiriting</label>
          <input
            type='text'
            value={nameInputText}
            placeholder='Ism kiriting'
            onChange={(e) => setNameInputText(e.target.value)}
          />
        </div>
        <div>
          <label>Email kiriting</label>
          <input
            type='email'
            value={emailInputText}
            placeholder='Email kiriting'
            onChange={(e) => setEmailInputText(e.target.value)}
          />
        </div>
        <div>
          <label>Yosh kiriting</label>
          <input
            type='number'
            value={ageInputText}
            placeholder='Yosh kiriting'
            onChange={(e) => setAgeInputText(e.target.value)}
          />
        </div>
        <div>
          <label>Img URL kiriting</label>
          <input
            type='text'
            value={imgUrlInputText}
            placeholder='Img URL kiriting'
            onChange={(e) => {
              setImgUrlInputText(e.target.value);
              handleUrlValidation(e.target.value);
            }}
          />
          {!isValidUrl && <p className='text-red-500'>Invalid URL</p>}
        </div>
        <div>
          <button className='add__button' onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
      <div className='todo__list'>
        <ul>
          {todoList.map((todo, index) => (
            <li key={index}>
              <div>
                <p>Email: {todo.email}</p>
                <p>Ismi: {todo.name}</p>
                <p>Familiyasi: {todo.surname}</p>
                <p>Yoshi: {todo.age}</p>
                <img src={todo.imgUrl} alt={todo.name} />
              </div>
              <div>
                {editIndex === index ? (
                  <button className='edit' onClick={() => handleUpdate(index)}>
                    Update
                  </button>
                ) : (
                  <>
                    <button className='edit' onClick={() => handleEdit(index)}>
                      Edit
                    </button>
                    <button className='delete' onClick={() => handleDelete(index)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
