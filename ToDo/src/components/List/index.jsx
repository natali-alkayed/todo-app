import React from 'react';
import './list.scss';

const List = ({ items, toggleComplete }) => {
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default List;
