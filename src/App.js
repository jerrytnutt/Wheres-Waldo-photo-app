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
    let goF = () => {
      console.log('done')
    }
    const pullFromFirebase = (character) => 
{
    return new Promise((resolve, reject) => 
    {
    dataFor.once('value').then(function (snapshot) 
        {
        const users = Object.keys(snapshot.val()).map(function (key) {
                return snapshot.val()[key];
            })
            
           if (users[character].name === "Batman"){
             
            resolve(users);
            return goF()
           }
           return 0
            
        });
    })
}
    pullFromFirebase(character)
    return 0
    
    
    
    
    
  

    const location = characterArray[character]["Location"]
    let xValue = characterCoord[0]
    let yValue = characterCoord[1]
    const newArr = [...characterArray]
    if (xValue >= location["x1"] && xValue <= location["x2"] && yValue >= location["y1"] && yValue <= location["y2"]){
      newArr.splice(character, 1)
      setCharacterArray(newArr)
    }
    if(newArr.length === 0){
      console.log('Game Over')
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