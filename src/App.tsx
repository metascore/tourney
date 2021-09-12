import React, { useEffect, useMemo, useState } from 'react'
import logo from './logo.svg'
import './App.css'

import { createActor, Metadata } from '@metascore/query-staging';

function App() {

  const metascoreQuery = useMemo(() => createActor(), []);
  
  const [count, setCount] = useState(0);
  const [games, setGames] = useState<Metadata[]>();

  useEffect(() => {
    metascoreQuery.getGames().then(setGames);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Games</h1>
        <ul>
          {games?.map(game => <li>{game.name}</li>)}
        </ul>
        <h1></h1>
      </header>
    </div>
  )
}

export default App
