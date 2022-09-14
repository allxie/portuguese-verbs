import {useState} from 'react';
import sentences from './sentences';
import './App.css';

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
  const [goToNext, setGoToNext] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const [availableVerbs, setAvailableVerbs] = useState([0])

  const [sentence, setSentence] = useState(sentences[getRandom(availableVerbs)])
  const [subject, setSubject] = useState(getRandom(subjects))
  const [tense, setTense] = useState(getRandom(tenses))

  const [success, setSuccess] = useState(false)

  const [hintCount, setHintCount] = useState(0)

  const reset = () => {
    setSentence(sentences[getRandom(availableVerbs)])
    setTense(getRandom(tenses))
    setSubject(getRandom(subjects));
    setSuccess(false);
    setInputValue('');
    setGoToNext(0)
    setHintCount(0)
  }

  const hint = () => {
    setHintCount(hintCount + 1)
  }

  const answer = sentence.verbConjugation[tense.key][subject.key]

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if(success) return reset()
      if(goToNext === 1) return reset()

      setGoToNext(1)
    }
  }

  /* Checklist */

  const handleVerbCheck = (e) => {
    const index = Number(e.target.value)

    var updatedList = [...availableVerbs]
    if (e.target.checked) {
      updatedList = [...availableVerbs, index]
    } else {
      updatedList.splice(availableVerbs.indexOf(index), 1)
    }

    setAvailableVerbs(updatedList);
  }

  const isChecked = (index) => {
    return availableVerbs.indexOf(index) !== -1
  }

  const getEnglishSentenceColor = () => {
    if(hintCount > 1) return 'grey'
    if(success) return 'green'
    else return '#282c34'
  }

  /* Main Render */
  return (
    <div className="App">
      <header className="App-header">   
        <p style={{
          fontSize: '1em',
          color: getEnglishSentenceColor(),
        }}>
          {`${subject.english} ${sentence.englishVerbConjugation[tense.key]} ${sentence.secondHalfEnglish}`}
        </p>        
        <div
          style={{flexDirection:"row", height: '55px'}}
        >
          {subject.display} 
          <input
            style={{
              padding: '10px',
              margin: '10px',
              border: '0px',
              display: hintCount > 1 ? 'none' : 'inline',
              backgroundColor: success ? 'green' : 'white'
            }}
            placeholder={sentence.englishVerbConjugation[tense.key]}
            value={inputValue}
            onChange={(e)=> {
              setInputValue(e.target.value)
              setGoToNext(0)
              if(e.target.value === answer) {
                setSuccess(true)
              }
            }}
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

        <div style={{
          fontSize: '.7em',
          display: success ? 'none' : 'block',
          color: 'grey',
          height: '40px'
        }}>
          {`${hintCount < 1 ? sentence.verbEnglish : sentence.verbRoot} (${tense.display})`}  
        </div>
        
        <div style={{
          display: success ? 'block': 'none',
          color: 'grey',
          height: '40px'
        }}>
          Press "enter" to continue
        </div>

        <div style={{
          display: goToNext ? 'block': 'none',
          color: 'grey'
        }}>
          Press "enter" again to skip
        </div>

        {/* BUTTONS */}

        <div>
          <button 
            style={{marginTop: "20px", marginRight: '15px'}}
            onClick={() => hint()}
          >
            Hint
          </button>
          <button 
            style={{marginTop: "20px"}}
            onClick={() => reset()}
          >
            Next
          </button>
        </div>

        {/* CHECKBOX */}
        <div
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            padding: '20px',
            border: '1px solid white',
            width: '20vw',
            fontSize:'.7em',
            justifyContent: 'left',
            textAlign: 'left'
          }}
        >
        {
          sentences.map((sentence, index) => {
            return (
              <div key={index}>
                <input 
                  value={index} 
                  type="checkbox" 
                  onChange={handleVerbCheck}
                  defaultChecked={isChecked(index)}
                />
                <span 
                  style={{
                    color: isChecked(index) ? 'white' : 'grey'
                  }}
                >
                  {sentence.verbEnglish}  
                </span>
              </div>
            )
          })
        }
        </div>
      </header>
    </div>
  );
}

export default App;
