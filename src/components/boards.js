import { useState } from 'react/';
import {db,storage} from "../firebase_config.js"

const Boards = ({getBackgroundData,leaderBoard,setleaderBoard,score,resetGame}) => {
    const [startMenu, setstartMenu] = useState(true)
    const [userName, setuserName] = useState('');
    const [imgPreview, setimgPreview] = useState([]);
    const [level, setlevel] = useState(null);
    storage.refFromURL("gs://waldoapp.appspot.com/smallone.jpg") 
    .getDownloadURL()
      .then((url) => {
        setimgPreview(url);
      })
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if (level === null){
          return null

        }
        console.log(e.target.getAttribute('button'))
        if (leaderBoard.indexOf(userName) !== -1){
          return null
        }
        console.log(leaderBoard)
        setstartMenu(false)
        return getBackgroundData()   
       }
       const addName = (e) => {
         for (let i = 0; i<leaderBoard.length;i++){
           if (leaderBoard[i].name === userName){
             console.log("nope")
             return null
           }
         }
        
         let leaderCopy = [...leaderBoard]
         leaderCopy.push({name:userName,score:score})
         leaderCopy = leaderCopy.sort(function(a, b) {
          return a.score - b.score
      });
         db.ref('Leaderboard').set(leaderCopy)
         setleaderBoard(leaderCopy)
         return resetGame()
       }
      
    return(
      <div>
          <div>{startMenu ? 
          <div className="startDisplay" >
            <h1>Can you find all the hidden characters?</h1>
            <h2>Enter your name to begin...</h2>
          <form onSubmit = {handleSubmit}>
            <input onChange = {(e) => setuserName(e.target.value)} value = {userName}></input>
            <button disabled={!userName} name="sam" type ='submit'>Start Game</button>
            <div className="levelContainer">
            


            </div>
            
            
          </form>
          <div className="img">
          <div><img onClick={() => {setlevel('left')}} src={imgPreview} alt="" /></div>
            <div><img onClick={() => {setlevel('right')}} src={imgPreview} alt="" /></div>
            </div>

          <p>Art by <a href="https://www.artstation.com/artwork/Z5VrOm">Egor Klyuchnyk</a></p>
          </div>: null}
        </div>
        <div>{leaderBoard.length !== 0 ? 
          <div className="leaderDisplay" >
           <h1>Leaderboard</h1>
           <button onClick={addName}>Add Name</button>
           {leaderBoard.map((x) => {
           const index = leaderBoard.indexOf(x)
           console.log(userName,score)
           return <div className="ranking" key={index}><p className="left">{index + 1}.</p><p className="left">{x.name}</p><p className="score">{x.score}</p>
          
           </div>
           
            
            })}
          </div>: null}
        </div>
        
       </div>
    )
}
export default Boards