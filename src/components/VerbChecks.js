import sentences from '../sentences';


function VerbChecks({isChecked, handleVerbCheck}) {


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
