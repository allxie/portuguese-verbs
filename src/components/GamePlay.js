import {useState} from 'react';
import cards from '../languageConstants/cards'
import './GamePlay.css';

const subjects = {
  eu:  { display: 'Eu', english: 'I'},
  voce: { display: 'Você', english: 'You'},
  // {key: 'ele', display: 'Ele', english: 'He'},
  // {key: 'ela', display: 'Ela', english: 'She'}
  elas: { display: 'Elas', english: 'They'},
  // {key: 'voces', display: 'Vocês', english: 'Y'all'},
}

const hintButtonStatus = {
  0: 'Get hint (verb root)',
  1: 'Get hint (regularity)',
  2: 'Get answer',
  3: 'Get answer'
}

function GamePlay({giveUp, winPoints, availableVerbs, availableTenses}) {

  const getRandomCard = () => {
    const viableCards = cards.filter((card) => {
      return availableVerbs.indexOf(card.root) !== -1 
      && availableTenses.indexOf(card.tense) !== -1
    })
    return viableCards[Math.floor(Math.random() * viableCards.length)]
  }

  const [success, setSuccess] = useState(false)

  const [hintCount, setHintCount] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const [card, setCard] = useState(getRandomCard())

  const nextCard = () => {
    setCard(getRandomCard())
    setSuccess(false);
    setInputValue('');
    setHintCount(0)
  }

  const handleCorrectAnswer = () => {
    setSuccess(true)
    winPoints()
  }

  const hint = () => {
    if(hintCount === 2) {
      giveUp()
    }
    setHintCount(hintCount + 1)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if(success || hintCount === 3) return nextCard()
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
      <p className={`${hintCount < 3? 'engSentenceHidden': 'engSentenceShow'} ${success ? 'textSuccess': ''}`}>
        {`${subjects[card.subject].english} ${card.en} ${card.sentence}`}
      </p>

      {/* Sentence */}
      <div className='game'>
        {subjects[card.subject].display} 
        <input
          className={`verb-input ${success ? 'input-success' : ''} ${hintCount > 2 ? 'invisible' : ''}`}
          placeholder={card.en}
          value={inputValue}
          onChange={onInput}
          onKeyDown={handleKeyDown}
        />
        <span className={hintCount < 3 ? 'invisible' : ''}>
          {` ${card.conjugation} `}
        </span>
        {card.frase}
      </div>

      {/* Helpers */}
      <div className={`sentence sentence-small ${success ? 'invisible' : 'visible'}`}>
        { hintCount > 0 ? card.root: card.en }
        {` (${card.tense})`}
        { hintCount > 1 ? `${card.regular? ' - regular': ' - irregular'}`: ''}
      </div>
      
      <div className={`sentence ${success ? 'visible' : 'invisible'}`}>
        Press "enter" to continue
      </div>

      {/* BUTTONS */}

      <div>
        <button 
          className='game-button'
          onClick={hint}
          disabled={hintCount > 2 || success}
        >
          { hintButtonStatus[hintCount] }
        </button>
        <button 
          className='game-button'
          onClick={() => nextCard()}
          disabled={hintCount < 3 && !success}
        >
          { hintCount > 2 ? 'New Game' : 'Next' }
        </button>
      </div>
    </div>
  )
}

export default GamePlay;
