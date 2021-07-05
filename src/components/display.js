import { useState } from 'react/';

const Display = ({recieveCharacterCoord,imageUrl,getBackgroundData,characterArray,leader,score}) => {
  const [userName, setuserName] = useState('');
  const [startMenu, setstartMenu] = useState(true)
  const [boxCoord, setboxCoord] = useState([0,0])
  const [boxDisplay, setboxDisplay] = useState("none")
  const [characterCoord, setcharacterCoord] = useState()
  
  const receiveCoordinates = (event) => {
    if (boxDisplay === "block") return setboxDisplay("none")
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    setboxCoord([event.clientY,event.clientX])
    setcharacterCoord([x,y])
    return setboxDisplay("block")
  };

  const checkCharacter = (name) => {
    recieveCharacterCoord(characterCoord,name)
    return setboxDisplay("none")
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setstartMenu(false)
    return getBackgroundData()   
   }

    return(
      <div>
        <img src={imageUrl} onClick={(event) => receiveCoordinates(event)} alt="" /> 
        <div>{startMenu ? 
          <div className="startDisplay" >
            <h1>Can you find all the characters?</h1>
            <h2>Please enter your name to begin...</h2>
          <form onSubmit = {handleSubmit}>
            <input onChange = {(e) => setuserName(e.target.value)} value = {userName}></input>
            <button disabled={!userName} type ='submit'>Start Game</button>
            <p>Art by Egor Klyuchnyk</p>
          </form>
          </div>: null}
        </div>

        <div>{leader.length !== 0 ? 
          <div className="startDisplay" >
           <h1>Leaderboard</h1>
           
           {leader.map((x) => {
           const index = leader.indexOf(x)
           console.log(userName,score)
           return <div className="ranking" key={index}><p className="left">{index + 1}</p><p className="left">{x.name}</p><p className="score">{x.score}</p>
           <button ></button>
           </div>
            
            })}
          </div>: null}
        </div>

         <div className="circle" style={{top: (boxCoord[0]-55),left: (boxCoord[1]-55),display:boxDisplay}}></div>
         <div className="list" style={{top: boxCoord[0]+55,left: boxCoord[1]+55,display:boxDisplay}}>
           {characterArray.map((x) => {
           const index = x.name
           return <div key={x.Location.x1} onClick={() => checkCharacter(index)} >{x.name}</div>
            
            })}
       </div>
       </div>
    )
}
export default Display