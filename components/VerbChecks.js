import sentences from '../sentences';


function VerbChecks({availableVerbs, setAvailableVerbs}) {
  
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

  return (
    <div className='box box-left'>
      <h5 id='verb-list-title'>Verbs to Practice</h5>
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
  );
}
export default VerbChecks;
