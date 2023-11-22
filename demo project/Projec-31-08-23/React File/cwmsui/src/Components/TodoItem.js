import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoItem = ({ id, name, completed }) => {
  const [isChecked, setIsChecked] = useState(completed === 'Y');

  useEffect(() => {
    setIsChecked(completed === 'Y');
  }, [completed]);

  const handleCheckboxClick = async () => {
    try {
      const newCompletedValue = !isChecked ? 'Y' : 'N';
      await axios.put(`/api/todo/${id}`, { completed: newCompletedValue });
      setIsChecked(!isChecked);
    } catch (error) {
      console.error('Error updating todo item:', error);
    }
  };

  console.log(isChecked);

  return (
    <div>
      {/* Use onClick instead of checked */}
      <input type="checkbox" onClick={handleCheckboxClick} />
      <span>{name}</span>
    </div>
  );
};

export default TodoItem;
