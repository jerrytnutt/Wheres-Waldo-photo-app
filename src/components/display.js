import { useState } from 'react/';
const Display = ({checkData,imageUrl}) => {
  const [boxCoord, setboxCoord] = useState([0,0])
  const [boxDisplay, setboxDisplay] = useState("none")

  const checkCoordinates = (event) => {
    let x = event.clientX;
    let y = event.clientY;
    
    setboxCoord([y,x])
    checkData([x,y])
    if (boxDisplay === "none") return setboxDisplay("block")
    return setboxDisplay("none")
  };
    return(
        <div>
    <img src={imageUrl} onClick={(event) => checkCoordinates(event)} alt="" /> 
     
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