import React, { useState } from 'react';
import claculator from './calculatoroop';

const FruitInput = () => {


    const [keys2, setKeys2] = useState([]);


  // Array of fruits
  const fruits = ['Mango', 'Melon', 'Mandarin', 'Mulberry', 'Mangoes', 'pineapple', 'orange','kiwi', 'dragonfruit'];
  const parties = ['Sawant textile', 'Raymond', 'Birla century', 'Indocount'];


  
    


  // State to hold the current input value
  const [inputValue, setInputValue] = useState('');
 const [result, setResult] = useState(0)
 const [number1, setNumber1] = useState(0);
 const [number2, setNumber2] = useState(0);


  // Filter fruits that start with 'm' or 'M'
  const filteredFruits = fruits.filter(fruit => fruit.toLowerCase().startsWith(inputValue.toLowerCase()));
 const filterparties = parties.filter(party => party.toLowerCase().startsWith(inputValue.toLowerCase()));

  

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };



  const handleCalculate = () => {
    // Create an instance of the Calculator class
    const calc = new claculator(number1, number2);

    // Perform the addition
    const additionResult = calc.mul();
    setResult(additionResult);
};











  return (
    <div>
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange} 
        list="fruit-list" 
        autoFocus
        title='Enter party name'
        // placeholder="Type a fruit name"
      />
      <datalist id="fruit-list">
        {inputValue && filteredFruits.map((fruit, index) => (
          <option key={index} value={fruit} />
        ))}
      </datalist>

     
      <div>
            <h1>React Calculator</h1>
            <input type="number" onChange={e => setNumber1(e.target.value)}/>
            <input type='number' onChange={e => setNumber2(e.target.value)}></input>
            <button type='button' onClick={handleCalculate}>Calculate</button>
            <p>Result: {result}</p>
        </div>

        
    
    </div>
  );
};

export default FruitInput;
