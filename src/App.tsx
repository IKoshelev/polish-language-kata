import React, { useState } from 'react';
import './App.css';
import { Cases } from './Cases';

type Mode = 'cases';
const APP_MODE_KEY = 'app-mode-key';

function getModeFromQS(){
  const searchParams = new URLSearchParams(window.location.search);

  if (searchParams.has(APP_MODE_KEY)) {
    return searchParams.get(APP_MODE_KEY);
  }
}

function setModeToQs(mode: Mode) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(APP_MODE_KEY, mode);
  window.location.search = searchParams.toString();
}

function App() {

  const [mode, setMode] = useState(getModeFromQS() ?? 'cases' as Mode)

  return (
    <div className="App">
      {mode === 'cases' && <Cases />}
    </div>
  );
}

export default App;
