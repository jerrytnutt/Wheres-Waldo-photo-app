import './App.css';
import { useState } from 'react/';
import {db} from "./firebase_config.js"
//Egor Klyuchnyk

function App() {
  const [boxCoord, setboxCoord] = useState([0,0])
  const [boxDisplay, setboxDisplay] = useState("none")
  const build = (event) => {
    
    let x = event.clientX;
    let y = event.clientY;
    if (x>45 && x<80){
      console.log('Found')
    }
    setboxCoord([y,x])
    if (boxDisplay === "none") return setboxDisplay("block")
    return setboxDisplay("none")
  };
  return (
    <div className="App">
    
     <div className='canvas' onClick={(event) => build(event)}>
     <div className="list" style={{top: boxCoord[0],left: boxCoord[1],display:boxDisplay}}></div>

     <div className="green" ></div>


     </div>
     
    </div>
  );
}
export default App;