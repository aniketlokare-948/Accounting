// src/components/Number2.js
import React from 'react';
import { useSelector } from 'react-redux';

const Number2 = () => {
  const firstname = useSelector((state) => state.user.firstname); // Access firstname from Redux store

  return (
    <div>
      <h1>Number 2 Component</h1>
      <p>Firstname from Redux store: {firstname || 'No firstname set yet'}</p>
    </div>
  );
};

export default Number2;
