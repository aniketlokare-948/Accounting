// src/components/Number1.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFirstname } from '../redux/userSlice';

const Number1 = () => {
  const [firstname, setFirstnameState] = useState('Omkar');
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const newFirstname = event.target.value;
    setFirstnameState(newFirstname);
    dispatch(setFirstname(newFirstname)); // Dispatch to Redux store
  };

  return (
    <div>
      <h1>Number 1 Component</h1>
      <input
        type="text"
        value={firstname}
        onChange={handleChange}
      />
    </div>
  );
};

export default Number1;
