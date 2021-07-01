import './App.css';
import {useState} from 'react/';
import {storage,db} from "./firebase_config.js"
import Header from "./components/header.js"
import Display from "./components/display.js"

//Egor Klyuchnyk
//leaderboard and help images

function App() {
  const [characterArray,setCharacterArray] = useState([])
  const [imageUrl, setImageUrl] = useState(undefined);
  
  const getDatabaseInfo = () => {
    storage.refFromURL("gs://waldoapp.appspot.com/egor-klyuchnyk-character.jpg") 
    .getDownloadURL()
        .then((url) => {
          setImageUrl(url);
        })
        
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
      return characterArray 
  };
  
  const checkCharacterData = (characterCoord,character) =>{
    const location = characterArray[character]["Location"]
    let xValue = characterCoord[0]
    let yValue = characterCoord[1]
    
    if (xValue >= location["x1"] && xValue <= location["x2"] && yValue >= location["y1"] && yValue <= location["y2"]){
      const newArr = [...characterArray]
      newArr.splice(character, 1)
      setCharacterArray(newArr)
    }
    return characterArray
    
  }
  return (
    
    <div className="App" >
      <Header characterArray={characterArray}/>
      <Display 
      imageUrl={imageUrl} 
      checkCharacterData={checkCharacterData} 
      getDatabaseInfo={getDatabaseInfo}
      characterArray={characterArray}/>
    </div>
  );
}
export default App;