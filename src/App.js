import './App.css';
import { useState} from 'react/';
import {storage,db} from "./firebase_config.js"
import Header from "./components/header.js"
import Display from "./components/display.js"

//Egor Klyuchnyk
//leaderboard and help images

function App() {
  const [characterArray,setCharacterArray] = useState([])
  const [imageUrl, setImageUrl] = useState(undefined);
  
  const openRead = () => {
    storage.refFromURL("gs://waldoapp.appspot.com/egor-klyuchnyk-character.jpg") 
    .getDownloadURL()
        .then((url) => {
          setImageUrl(url);
        })
        
     return readSum() 
  };
  
  const readSum = () => {
    let ar = []
    //https://stackoverflow.com/questions/64076261/firebase-response-is-too-slow
  // react functional components rerendering
    const dataFor = db.ref('Characters');
    dataFor.on('value', (snapshot) => {
        snapshot.forEach(data => {
          ar.push(data.val())
          
        })
      })
      setTimeout(() => {
        setCharacterArray(ar) 
      }, 1000);
  };
  const checkData = (coordinates) =>{
    console.log(coordinates)
    //console.log(characterArray)
  }
  return (
    
    <div className="App" >
      <Header characterArray={characterArray}/>
      <button className='y' onClick={openRead}>Button</button>
      
      <Display imageUrl={imageUrl} checkData={checkData}/>
    </div>
  );
}
export default App;