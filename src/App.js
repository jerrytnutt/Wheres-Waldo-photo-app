import './App.css';
import { useState } from 'react/';
import {storage} from "./firebase_config.js"
import sto from './sto.jpg'
//Egor Klyuchnyk
//leaderboard and help images

function App() {
  const [boxCoord, setboxCoord] = useState([0,0])
  const [boxDisplay, setboxDisplay] = useState("none")
  const [imageUrl, setImageUrl] = useState(undefined);
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
  const openRead = () => {
    storage.refFromURL("gs://waldoapp.appspot.com/im/sto.jpg") //name in storage in firebase console
    .getDownloadURL()
        .then((url) => {
          console.log(url)
          setImageUrl(url);
        })
       

    
  }
  return (
    <div className="App">
    
     <div className='canvas' onClick={(event) => build(event)}>
     <img src={imageUrl} alt=""></img>
     <div className="list" style={{top: boxCoord[0],left: boxCoord[1],display:boxDisplay}}>
       <div>Type1</div>
       <div>Type2</div>
       <div>Type3</div>



     </div>

     <div className="green" ></div>
     


     </div>
     <div className="set"></div>
     <button onClick={openRead}>Button</button>
    </div>
  );
}
export default App;