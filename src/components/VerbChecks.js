import verbs from '../languageConstants/verbs'

function VerbChecks({availableVerbs, setAvailableVerbs}) {
  
  const handleVerbCheck = (e) => {
    const portugueseVerb = e.target.value

    var updatedList = [...availableVerbs]
    if (e.target.checked) {
      updatedList = [...availableVerbs, portugueseVerb]
    } else {
      updatedList.splice(availableVerbs.indexOf(portugueseVerb), 1)
    }

    setAvailableVerbs(updatedList);
  }

  const isChecked = (portugueseVerb) => {
    return availableVerbs.indexOf(portugueseVerb) !== -1
  }

  return (
    <div className='box box-left'>
      <h5 id='verb-list-title'>Verbs to Practice</h5>
      {
        Object.entries(verbs).map(([portugueseVerb, englishVerb], index) => {
          return (
            <div key={index}>
              <input 
                value={portugueseVerb} 
                type="checkbox" 
                onChange={handleVerbCheck}
                defaultChecked={isChecked(portugueseVerb)}
              />
              <span 
                style={{
                  color: isChecked(portugueseVerb) ? 'white' : 'grey'
                }}
              >
                {englishVerb}  
              </span>
            </div>
          )
        })
      }
    </div>
  );
}
export default VerbChecks;
