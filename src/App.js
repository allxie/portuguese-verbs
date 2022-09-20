import {useState} from 'react';
import sentences from './sentences';
import './App.css';
import VerbChecks from './components/VerbChecks';


const subjects = [
  {key: 'eu', display: 'Eu', english: 'I'},
  {key: 'voce', display: 'Você', english: 'You'},
  {key: 'elas', display: 'Elas', english: 'They'}
]

const tenses = [
  {key: 'present', display: 'present'},
  {key: 'pastPerfect', display: 'past perfect'},
  {key: 'pastImperfect', display: 'past imperfect'}
]

const getRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

function App() {
  const [inputValue, setInputValue] = useState('')

  const [availableVerbs, setAvailableVerbs] = useState([0])

  const [sentence, setSentence] = useState(sentences[getRandom(availableVerbs)])
  const [subject, setSubject] = useState(getRandom(subjects))
  const [tense, setTense] = useState(getRandom(tenses))

  const [success, setSuccess] = useState(false)

  const [hintCount, setHintCount] = useState(0)

  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)

  const nextSentence = () => {
    setSentence(sentences[getRandom(availableVerbs)])
    setTense(getRandom(tenses))
    setSubject(getRandom(subjects));
    setSuccess(false);
    setInputValue('');
    setHintCount(0)
  }

  const handleCorrectAnswer = () => {
    setSuccess(true)
    setScore(0)
    setStreak(streak + 1)
  }

  const giveUp = () => {
    setScore(0)
    setStreak(0)
  }

  const hint = () => {
    if(hintCount === 1) {
      giveUp()
    }
    setHintCount(hintCount + 1)
  }

  const answer = sentence.verbConjugation[tense.key][subject.key]

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if(success || hintCount === 2) return nextSentence()
    }
  }

  const onInput = (e) => {
    setInputValue(e.target.value)
    if(e.target.value === answer) {
      handleCorrectAnswer()
    }
  }

  const getEnglishSentenceColor = () => {
    if(hintCount > 1) return 'grey'
    if(success) return 'green'
    else return '#282c34'
  }

  const getEnglishVerb = () => {
    const englishTense = sentence.englishVerbConjugation[tense.key]
    if(typeof englishTense === 'object') return englishTense[subject.key]
    else return englishTense
  }

  /* Main Render */
  return (
    <div className="App">
      <header className="App-header">   
        <p style={{
          fontSize: '1em',
          color: getEnglishSentenceColor(),
        }}>
          {`${subject.english} ${getEnglishVerb()} ${sentence.secondHalfEnglish}`}
        </p>     
        <div
          style={{flexDirection:"row", height: '55px'}}
        >
          {subject.display} 
          <input
            className='verb-input'
            style={{
              display: hintCount > 1 ? 'none' : 'inline',
              backgroundColor: success ? 'green' : 'white'
            }}
            placeholder={getEnglishVerb()}
            value={inputValue}
            onChange={onInput}
            onKeyDown={handleKeyDown}
          />
          <span
            style={{
              display: hintCount < 2 ? 'none' : 'inline',
            }}
          >
            {` ${answer} `}
          </span>
          {sentence.secondHalf}
        </div>

        <div className={`sentence sentence-small ${success ? 'invisible' : 'visible'}`}>
          {`${hintCount < 1 ? sentence.verbEnglish : sentence.verbRoot} (${tense.display})`}  
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
            onClick={() => nextSentence()}
            disabled={hintCount < 2 && !success}
          >
            { hintCount > 1 ? 'New Game' : 'Next' }
          </button>
        </div>

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
