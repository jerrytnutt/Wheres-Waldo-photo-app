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
    let x = coordinates[0]
    let length = coordinates.length
    let locations;
    for(let i =0;i<length+1;i++){
      locations = characterArray[i].Location
      console.log(characterArray)
      if(x >= locations['x1'] && x <= locations["x2"]){
        console.log('found')
      }
    }
  }
  return (
    
    <div className="App" >
      <Header characterArray={characterArray}/>
     
      
      <Display imageUrl={imageUrl} checkData={checkData} openRead={openRead}/>
    </div>
  );
}
export default App;