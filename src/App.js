import {useState} from 'react/';
import {storage,db} from "./firebase_config.js"
import Header from "./components/header.js"
import Display from "./components/display.js"
import Boards from "./components/boards.js"
import './App.css';

function App() {
  const [characterArray,setCharacterArray] = useState([])
  const [characterGroup,setcharacterGroup] = useState("Characters")
  const [imageUrl, setImageUrl] = useState(null);
  const [seconds, setSeconds] = useState(false);
  const [leaderBoard, setleaderBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [missBox, setmissBox] = useState(false);
  
  const getBackgroundData = (level) => {
    let characterPart;
    if (level === "left"){
      level = "gs://waldoapp.appspot.com/egor-klyuchnyk-character.jpg"
      characterPart = "Characters"
    }else{
      level = "gs://waldoapp.appspot.com/egor-klyuchnyk-character-part2.jpg"
      characterPart = "Characters-part2"
      setcharacterGroup("Characters-part2")
    }
    storage.refFromURL(level) 
      .getDownloadURL()
        .then((url) => {
          setImageUrl(url);
        })
         
         return getCharacterData(characterPart)
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
    setImageUrl(null)
    setScore(time.toString())
    return setleaderBoard(board)
    }) 
  }; 

  const resetGame = () =>{
    setleaderBoard([])
    setCharacterArray([])
    setcharacterGroup("Characters")
    return setImageUrl(null) 
  }; 

  const recieveCharacterCoord = (characterCoord,character) =>{
    
    getCharacterData(characterGroup,character).then((item) => {
      console.log(characterGroup)
      console.log(character)
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
      <Header 
      characterArray={characterArray} 
      missBox={missBox} 
      setmissBox={setmissBox}
      seconds={seconds}
      setSeconds={setSeconds}/>

      <Boards
      getBackgroundData={getBackgroundData}
      getCharacterData={getCharacterData}
      leaderBoard={leaderBoard}
      setleaderBoard={setleaderBoard}
      score={score}
      resetGame={resetGame}
      />
      <Display 
      imageUrl={imageUrl} 
      recieveCharacterCoord={recieveCharacterCoord} 
      characterArray={characterArray}/>
    </div>
  );
}
export default App;