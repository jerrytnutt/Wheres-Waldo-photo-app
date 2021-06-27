import { useState } from 'react/';
const Display = (props) => {
  const [boxCoord, setboxCoord] = useState([0,0])
  const [boxDisplay, setboxDisplay] = useState("none")

  const build = (event) => {
    let x = event.clientX;
    let y = event.clientY;
    console.log(x,y)

    if (x>45 && x<80){
      console.log('Found')
    }
    setboxCoord([y,x])
    if (boxDisplay === "none") return setboxDisplay("block")
    return setboxDisplay("none")
  };
    return(
        <div>
    <img src={props.imageUrl} onClick={(event) => build(event)} alt="" /> 
     
   <div className="circle" style={{top: (boxCoord[0] -75),left: (boxCoord[1]-75),display:boxDisplay}}>
     </div>

  <div className="list" style={{top: boxCoord[0],left: boxCoord[1],display:boxDisplay}}>
    <div>Type1</div>
    <div>Type2</div>
    <div>Type3</div>

  </div>
  <div className="set"></div>
        </div>
    )
}
export default Display