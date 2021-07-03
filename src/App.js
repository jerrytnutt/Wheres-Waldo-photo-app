import {useState} from 'react/';
import {storage,db} from "./firebase_config.js"
import Header from "./components/header.js"
import Display from "./components/display.js"
import './App.css';

//Egor Klyuchnyk
//leaderboard and help images

function App() {
  const [characterArray,setCharacterArray] = useState([])
  const [imageUrl, setImageUrl] = useState(null);

  const [isActive, setisActive] = useState(false);
  
  const getBackgroundData = () => {
    storage.refFromURL("gs://waldoapp.appspot.com/egor-klyuchnyk-character.jpg") 
    .getDownloadURL()
        .then((url) => {
          setImageUrl(url);
        })
         return getCharacterData()
      }
  const getCharacterData = (character=null) => {
    return new Promise((resolve) => {
        const dataFor = db.ref('Characters');
        dataFor.once('value').then(function (snapshot) 
        {

            const users = Object.keys(snapshot.val()).map(function (key) {
              if (snapshot.val()[key].name === character){
                character = snapshot.val()[key]
              }
                return snapshot.val()[key];
            })
            if (character === null){
              resolve(users);
            return setCharacterArray(users)
            } 
            return resolve(character);
        });
    })
}

const recieveCharacterCoord = (characterCoord,character) =>{
    getCharacterData(character).then((a) => {
      const location = a["Location"]
      const xValue = characterCoord[0]
      const yValue = characterCoord[1]
      const index = characterArray.findIndex(i => i.name === a.name);
      const newArr = [...characterArray]
      if (xValue >= location["x1"] && xValue <= location["x2"] && yValue >= location["y1"] && yValue <= location["y2"]){
        newArr.splice(index, 1)
        setCharacterArray(newArr)
        if(newArr.length === 0){
          console.log('Game Over')
        }
        return characterArray
      }
      setisActive(true)
      
      return character
    })
  }
  return (
    
    <div className="App" >
      <Header characterArray={characterArray} isActive={isActive} setisActive={setisActive}/>
      <Display 
      imageUrl={imageUrl} 
      recieveCharacterCoord={recieveCharacterCoord} 
      getBackgroundData={getBackgroundData}
      characterArray={characterArray}/>
    </div>
  );
}
export default App;