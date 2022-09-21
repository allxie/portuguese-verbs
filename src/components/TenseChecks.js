import cards from '../languageConstants/cards'

const tenses = [...new Set(cards.map(card => card.tense))]

function TenseChecks({availableTenses, setAvailableTenses}) {
  const handleCheck = (e) => {
    const tense = e.target.value

    var updatedList = [...availableTenses]
    if (e.target.checked) {
      updatedList = [...availableTenses, tense]
    } else {
      updatedList.splice(availableTenses.indexOf(tense), 1)
    }

    setAvailableTenses(updatedList);
  }

  const isChecked = (tense) => {
    return availableTenses.indexOf(tense) !== -1
  }

  return (
    <div className='box box-left'>
      <h5 id='verb-list-title'>Tenses</h5>
      {
        tenses.map((tense, index) => {
          return (
            <div key={index}>
              <input 
                value={tense} 
                type="checkbox" 
                onChange={handleCheck}
                defaultChecked={isChecked(tense)}
              />
              <span 
                style={{
                  color: isChecked(tense) ? 'white' : 'grey'
                }}
              >
                {tense}  
              </span>
            </div>
          )
        })
      }
    </div>
  );
}
export default TenseChecks;
