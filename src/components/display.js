import { useState } from 'react/';
const Display = ({checkCharacterData,imageUrl,getDatabaseInfo, characterArray}) => {
  const [name, setName] = useState('');
  const [startButton, setstartButton] = useState(true)
  const [boxCoord, setboxCoord] = useState([0,0])
  const [boxDisplay, setboxDisplay] = useState("none")
  const [characterCoord, setcharacterCoord] = useState()
  
  const receiveCoordinates = (event) => {
    if (boxDisplay === "block") return setboxDisplay("none")
    let x = event.nativeEvent.offsetX;
    let y = event.nativeEvent.offsetY;
    setboxCoord([event.clientY,event.clientX])
    setcharacterCoord([x,y])
    return setboxDisplay("block")
  };

  const checkCharacter = (character) => {
    checkCharacterData(characterCoord,character)
    return setboxDisplay("none")
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Form submitted, ${name}`);
    setstartButton(false)
    return getDatabaseInfo()   
   }

    return(
        <div>
    <img src={imageUrl} onClick={(event) => receiveCoordinates(event)} alt="" /> 
    <div>{startButton ? <div className="startDisplay" >
      <h1>Can you find all the characters?</h1>
      <h2>Please enter your name to begin</h2>


      <form onSubmit = {handleSubmit}>
            <input onChange = {(e) => setName(e.target.value)} value = {name}></input>
            <button disabled={!name} type = 'submit'>Click to submit</button>
        </form>


      

     </div>: null}</div>
   <div className="circle" style={{top: (boxCoord[0]-55),left: (boxCoord[1]-55),display:boxDisplay}}>
     </div>

  <div className="list" style={{top: boxCoord[0]+55,left: boxCoord[1]+55,display:boxDisplay}}>
  {characterArray.map((x) => {
    const index = characterArray.indexOf(x)
    return <div key={x.Location.x1} onClick={() => checkCharacter(index)} >{x.name}</div>
            
        })}
    

  </div>
 
        </div>
    )
}
export default Display