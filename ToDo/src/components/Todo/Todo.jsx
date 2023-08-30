import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form.jsx';
import { useSettingsContext } from '../../Context/Setings/SettingsContext.jsx'; 
import { v4 as uuid } from 'uuid';
import { Pagination } from '@mantine/core';
import List from '../List/index.jsx';
import './todo.scss';
import PaginationComponent from '../Pagination/pagination.jsx';

const ToDo = () => {
  const { maxItemsPerPage, hideCompleted } = useSettingsContext(); 
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit, values } = useForm(addItem, defaultValues);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete} items pending`;
  }, [list, incomplete]);

  function addItem(item) {
    const isDuplicate = list.some(existingItem => existingItem.text === item.text && existingItem.assignee === item.assignee);
  
    if (!isDuplicate) {
      item.id = uuid();
      item.complete = false;
      setList([...list, item]);
    }
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredList = hideCompleted
    ? list.filter((item) => !item.complete)
    : list;

  const startIndex = (currentPage - 1) * maxItemsPerPage;
  const endIndex = startIndex + maxItemsPerPage;
  const paginatedList = filteredList.slice(startIndex, endIndex);

  return (
    <>
      <div className="ToDo">
        <h1>To Do List: {incomplete} items pending</h1>
      
        <form onSubmit={handleSubmit}>
          <h2>Add To Do Item</h2>
    
          <label>
            <span>To Do Item</span>
            <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
          </label>

          <label>
            <span>Assigned To</span>
            <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
          </label>

          <label>
            <span>Difficulty</span>
            <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
          </label>

          <label>
            <button type="submit">Add Item</button>
          </label>
        </form>

        <List items={paginatedList} toggleComplete={toggleComplete} />
        
        {list.length > maxItemsPerPage && (
          <PaginationComponent
            currentPage={currentPage}
            totalItems={filteredList.length}
            itemsPerPage={maxItemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      
      </div>
    </>
  );
};

export default ToDo;
