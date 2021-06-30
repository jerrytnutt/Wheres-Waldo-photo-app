import { useState } from 'react/';
const Display = ({checkData,imageUrl,openRead}) => {
  const [startButton, setstartButton] = useState(true)
  const [boxCoord, setboxCoord] = useState([0,0])
  const [boxDisplay, setboxDisplay] = useState("none")
  let start = false
  const checkCoordinates = (event) => {
    if (boxDisplay === "block") return setboxDisplay("none")
    let x = event.nativeEvent.offsetX;
    let y = event.nativeEvent.offsetY;
    
    
    setboxCoord([event.clientY,event.clientX])
    checkData([x,y])
    
    return setboxDisplay("block")
  };
  const startGame = () => {
    setstartButton(false)
    return openRead()
  };
    return(
        <div>
    <img src={imageUrl} onClick={(event) => checkCoordinates(event)} alt="" /> 
    <div>{startButton ? <div className="startDisplay" >
      <h1>Can you find all the characters?</h1>
      
      <button className='start'  onClick={startGame}>Start</button>

     </div>: null}</div>
   <div className="circle" style={{top: (boxCoord[0]-55),left: (boxCoord[1]-55),display:boxDisplay}}>
     </div>

  <div className="list" style={{top: boxCoord[0]+55,left: boxCoord[1]+55,display:boxDisplay}}>
    <div>Type1</div>
    <div>Type2</div>
    <div>Type3</div>

  </div>
 
        </div>
    )
}
export default Display