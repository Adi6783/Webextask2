import React, { useState } from 'react';
import './App.css';
import StarWarsData from './StarWarsData';

function App() {
  const [type, setType] = useState('planets');
  const [index, setIndex] = useState(1);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleIndexChange = (event) => {
    const newIndex = event.target.value;
    setIndex(newIndex ? parseInt(newIndex, 10) : '');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Star Wars Data</h1>
      </header>
      <main>
        <div>
          <label>
            Choose Data Type:
            <select value={type} onChange={handleTypeChange}>
              <option value="planets">Planets</option>
              <option value="films">Films</option>
              <option value="people">People</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Enter Index:
            <input
              type="number"
              value={index}
              onChange={handleIndexChange}
              min="1"
              placeholder="Enter index"
            />
          </label>
        </div>
        { <StarWarsData type={type} index={index} />}
      </main>
    </div>
  );
}

export default App;
