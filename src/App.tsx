import React, { useState } from 'react';
import './App.css';
import { Cases } from './Cases';

function App() {

  const [mode, setMode] = useState('cases' as 'cases')

  return (
    <div className="App">
      <Cases />
    </div>
  );
}

export default App;
