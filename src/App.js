import {useState} from 'react/';
import {storage,db} from "./firebase_config.js"
import Header from "./components/header.js"
import Display from "./components/display.js"
import './App.css';
//change leader name
function App() {
  const [characterArray,setCharacterArray] = useState([])
  const [imageUrl, setImageUrl] = useState(null);
  const [seconds, setSeconds] = useState(false);
  const [leader, setleader] = useState([]);
  const [score, setScore] = useState(0);
  const [missBox, setmissBox] = useState(false);
  
  const getBackgroundData = () => {
    storage.refFromURL("gs://waldoapp.appspot.com/egor-klyuchnyk-character.jpg") 
      .getDownloadURL()
        .then((url) => {
          setImageUrl(url);
        })
         return getCharacterData("Characters")
      };

  const getCharacterData = (refrence,character=null) => {
    return new Promise((resolve) => {
        const dataFor = db.ref(refrence);
        dataFor.once('value').then(function (snapshot) 
        {
        const content = Object.keys(snapshot.val()).map(function (key) {
          if (snapshot.val()[key].name === character){
            character = snapshot.val()[key]
          }
            return snapshot.val()[key];
          })
          if (refrence === "Leaderboard"){
            return resolve(content)
          }
          if (character === null){
            resolve(content);
            return setCharacterArray(content)
          } 
            return resolve(character);
        });
    })
};

  const gameOver = (time) =>{
    getCharacterData("Leaderboard").then((board) => {
      board = board.sort(function(a, b) {
        return a.score - b.score
    });
    setScore(time.toString())
    return setleader(board)
    }) 
  }; 

  const recieveCharacterCoord = (characterCoord,character) =>{
    
    getCharacterData("Characters",character).then((item) => {
      const location = item["Location"]
      const xValue = characterCoord[0]
      const yValue = characterCoord[1]
      const index = characterArray.findIndex(i => i.name === item.name);
      const newArr = [...characterArray]
      if (xValue >= location["x1"] && xValue <= location["x2"] && yValue >= location["y1"] && yValue <= location["y2"]){
        newArr.splice(index, 1)
        setCharacterArray(newArr)
        if(newArr.length === 0){
          return gameOver(seconds)
        }
        return characterArray
      }
      setmissBox(true)
      setTimeout(() => setmissBox(false),3000)
      return character
    })
  }
  
  return (
    <div className="App" >
      <Header characterArray={characterArray} 
      missBox={missBox} 
      setmissBox={setmissBox}
      seconds={seconds}
      setSeconds={setSeconds}/>
      
      <Display 
      imageUrl={imageUrl} 
      recieveCharacterCoord={recieveCharacterCoord} 
      getBackgroundData={getBackgroundData}
      characterArray={characterArray}
      leader={leader}
      score={score}/>
    </div>
  );
}
export default App;