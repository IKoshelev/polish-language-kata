import React, { useState } from 'react';
import './App.css';
import { Cases } from './Cases';
import { Verbs } from './Verbs';

type Mode = 'cases' | 'verbs';
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
      <div className='menu'>
        <div>
          <strong>Tryb: &nbsp;</strong>
        </div>
        {([['cases', 'Przypadki'],['verbs', 'Rzeczowniki']] as [Mode, string][])
          .map(([buttonMode, label]) => 
            <button 
              key={buttonMode}
              className={buttonMode === mode ? 'active' : ''}
              onClick={() => {
                setModeToQs(buttonMode); 
                setMode(buttonMode);
              }}
            >
              {label}
            </button>
          )}
      </div>
      <div>
        {mode === 'cases' && <Cases />}
        {mode === 'verbs' && <Verbs />}
      </div>
    </div>
  );
}

export default App;
