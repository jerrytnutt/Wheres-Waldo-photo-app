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
  const [isActive, setisActive] = useState(false);
  
  const getDatabaseInfo = () => {
    storage.refFromURL("gs://waldoapp.appspot.com/egor-klyuchnyk-character.jpg") 
    .getDownloadURL()
        .then((url) => {
          setImageUrl(url);
        })
        
       
      const dataFor = db.ref('Characters');
      
       const pullFromFirebase = () => 
{
    return new Promise((resolve, reject) => 
    {
        dataFor.once('value').then(function (snapshot) 
        {
            const users = Object.keys(snapshot.val()).map(function (key) {
               
                return snapshot.val()[key];
            })

            resolve(users);
            setCharacterArray(users)  // <--- here is the fix
        });
    })
}
pullFromFirebase()
      return 0
  };
  
  const checkCharacterData = (characterCoord,character) =>{
    const dataFor = db.ref('Characters');
    const pullFromFirebase = (character) => 
{
    return new Promise((resolve, reject) => 
    {
    dataFor.once('value').then(function (snapshot) 
        {
          let char = null;
        const users = Object.keys(snapshot.val()).map(function (key) {
                if (snapshot.val()[key].name === character){
                  char = snapshot.val()[key]
                }
                return snapshot.val()[key];
            })
            resolve(char);
            
        });
    })
}
    pullFromFirebase(character).then((a) => {
      console.log(a)
      const location = a["Location"]
      let xValue = characterCoord[0]
      let yValue = characterCoord[1]
      var index = characterArray.findIndex(i => i.name === a.name);
      console.log(index)
      const newArr = [...characterArray]
      console.log(newArr)
      if (xValue >= location["x1"] && xValue <= location["x2"] && yValue >= location["y1"] && yValue <= location["y2"]){
        newArr.splice(index, 1)
        console.log(newArr)
        setCharacterArray(newArr)
        if(newArr.length === 0){
          console.log('Game Over')
        }
        
        return characterArray
      }
      if(newArr.length === 0){
        console.log('Game Over')
      }
      setisActive(true)
      return characterArray
    })
  }
  return (
    
    <div className="App" >
      <Header characterArray={characterArray} isActive={isActive}/>
      <Display 
      imageUrl={imageUrl} 
      checkCharacterData={checkCharacterData} 
      getDatabaseInfo={getDatabaseInfo}
      characterArray={characterArray}/>
    </div>
  );
}
export default App;