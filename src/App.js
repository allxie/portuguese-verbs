import {useState} from 'react';
import './App.css';
import VerbChecks from './components/VerbChecks';
import TenseChecks from './components/TenseChecks';
import GamePlay from './components/GamePlay';
import cards from './languageConstants/cards';

const tenses = [...new Set(cards.map(card => card.tense))]

function App() {

  const [availableVerbs, setAvailableVerbs] = useState(['ir'])
  const [availableTenses, setAvailableTenses] = useState(tenses)

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
          availableTenses={availableTenses}
        />

        <div className="top-section section-left">
          <VerbChecks 
            availableVerbs={availableVerbs}
            setAvailableVerbs={setAvailableVerbs}
          />

          <TenseChecks 
            availableTenses={availableTenses}
            setAvailableTenses={setAvailableTenses}
          />
        </div>
        

        {/* Game Box */}
        <div className='top-section box section-right'>
          <div>Score: {score}</div>
          <div>Streak: {streak}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
