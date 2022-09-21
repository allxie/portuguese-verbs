import {useState} from 'react';
import cards from '../languageConstants/cards'
// import tenses from '../languageConstants/tenses';
import './GamePlay.css';

const subjects = {
  eu:  { display: 'Eu', english: 'I'},
  voce: { display: 'Você', english: 'You'},
  // {key: 'ele', display: 'Ele', english: 'He'},
  // {key: 'ela', display: 'Ela', english: 'She'}
  elas: { display: 'Elas', english: 'They'},
  // {key: 'voces', display: 'Vocês', english: 'Y'all'},
}

const getRandomCard = (availableVerbs) => {
  const viableCards = cards.filter((card) => availableVerbs.indexOf(card.root) !== -1)
  return viableCards[Math.floor(Math.random() * viableCards.length)]
}

function GamePlay({giveUp, winPoints, availableVerbs}) {
  const [success, setSuccess] = useState(false)

  const [hintCount, setHintCount] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const [card, setCard] = useState(getRandomCard(availableVerbs))

  const nextCard = () => {
    setCard(getRandomCard(availableVerbs))
    setSuccess(false);
    setInputValue('');
    setHintCount(0)
  }

  const handleCorrectAnswer = () => {
    setSuccess(true)
    winPoints()
  }

  const hint = () => {
    if(hintCount === 1) {
      giveUp()
    }
    setHintCount(hintCount + 1)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if(success || hintCount === 2) return nextCard()
    }
  }

  const onInput = (e) => {
    setInputValue(e.target.value)
    if(e.target.value.toLowerCase() === card.conjugation) {
      handleCorrectAnswer()
    }
  }

  return (
    <div>
      <p className={`${hintCount < 2? 'engSentenceHidden': 'engSentenceShow'} ${success ? 'textSuccess': ''}`}>
        {`${subjects[card.subject].english} ${card.en} ${card.sentence}`}
      </p>

      {/* Sentence */}
      <div className='game'>
        {subjects[card.subject].display} 
        <input
          className={`verb-input ${success ? 'input-success' : ''} ${hintCount > 1 ? 'invisible' : ''}`}
          placeholder={card.en}
          value={inputValue}
          onChange={onInput}
          onKeyDown={handleKeyDown}
        />
        <span className={hintCount < 2 ? 'invisible' : ''}>
          {` ${card.conjugation} `}
        </span>
        {card.frase}
      </div>

      {/* Helpers */}
      <div className={`sentence sentence-small ${success ? 'invisible' : 'visible'}`}>
        {`${hintCount < 1 ? card.en : card.root} (${card.tense})`}  
      </div>
      
      <div className={`sentence ${success ? 'visible' : 'invisible'}`}>
        Press "enter" to continue
      </div>

      {/* BUTTONS */}

      <div>
        <button 
          className='game-button'
          onClick={hint}
          disabled={hintCount > 1 || success}
        >
          { hintCount < 1 ? 'Get hint' : 'Get answer' }
        </button>
        <button 
          className='game-button'
          onClick={() => nextCard()}
          disabled={hintCount < 2 && !success}
        >
          { hintCount > 1 ? 'New Game' : 'Next' }
        </button>
      </div>
    </div>
  )
}

export default GamePlay;
