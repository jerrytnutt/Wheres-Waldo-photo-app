import { useState } from 'react/';

const Display = ({recieveCharacterCoord,imageUrl,characterArray}) => {
  const [boxCoord, setboxCoord] = useState([0,0])
  const [boxDisplay, setboxDisplay] = useState("none")
  const [characterCoord, setcharacterCoord] = useState()
  
  const receiveCoordinates = (event) => {
    if (boxDisplay === "block") return setboxDisplay("none")
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    console.log(x,y)
    setboxCoord([event.clientY,event.clientX])
    setcharacterCoord([x,y])
    return setboxDisplay("block")
  };

  const checkCharacter = (name) => {
    recieveCharacterCoord(characterCoord,name)
    return setboxDisplay("none")
  }
  
 
   

    return(
      <div>
        <img src={imageUrl} onClick={(event) => receiveCoordinates(event)} alt="" /> 
         <div className="circle" style={{top: (boxCoord[0]-55),left: (boxCoord[1]-55),display:boxDisplay}}></div>
         <div className="selectionList" style={{top: boxCoord[0]+55,left: boxCoord[1]+55,display:boxDisplay}}>
           {characterArray.map((x) => {
           const index = x.name
           return <div key={x.Location.x1} onClick={() => checkCharacter(index)} >{x.name}</div>
            
            })}
       </div>
       </div>
    )
}
export default Display