import {useState} from 'react';
import './App.css';
import VerbChecks from './components/VerbChecks';
import GamePlay from './components/GamePlay';

function App() {

  const [availableVerbs, setAvailableVerbs] = useState(['ir'])

  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)

  const winPoints = () => {
    setScore(0)
    setStreak(streak + 1)
  }

  const giveUp = () => {
    setScore(0)
    setStreak(0)
  }

  /* Main Render */
  return (
    <div className="App">
      <header className="App-header">   
        <GamePlay
          winPoints={winPoints}
          giveUp={giveUp}
          availableVerbs={availableVerbs}
        />

        <VerbChecks 
          availableVerbs={availableVerbs}
          setAvailableVerbs={setAvailableVerbs}
        />

        {/* Game Box */}
        <div className='box box-right'>
          <div>Score: {score}</div>
          <div>Streak: {streak}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
