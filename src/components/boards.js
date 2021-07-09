import { useState,useEffect } from 'react/';
import {db,storage} from "../firebase_config.js"




const Boards = ({getBackgroundData,leaderBoard,setleaderBoard,score,resetGame}) => {
    const [startMenu, setstartMenu] = useState(true)
    const [userName, setuserName] = useState("");
    const [levelOnePreview, setlevelOnePreview] = useState([]);
    const [levelTwoPreview, setlevelTwoPreview] = useState([]);
    const [level, setlevel] = useState(null);

    const handleSubmit = (e) => {
      e.preventDefault();
      for (let i = 0; i<leaderBoard.length;i++){
        console.log(leaderBoard[i].name)
        if (leaderBoard[i].name === userName){
          console.log(null)
          setuserName("")
          return null
        }
      }
      
      if (level === null){
        alert("Please select a level")
        return null
        }
        setstartMenu(false)
        return getBackgroundData(level)   
       }

       const addName = () => {
        
         
         
         let leaderCopy = [...leaderBoard]
         leaderCopy.push({name:userName,score:score})
         leaderCopy = leaderCopy.sort(function(a, b) {
          return a.score - b.score
      });
         db.ref('Leaderboard').set(leaderCopy)
         setleaderBoard(leaderCopy)
         
       }
       const select = (direction) => {
         setlevel(direction)
         if (userName !== ""){
          setstartMenu(false)
          return getBackgroundData(direction) 
         }

       }
      
       useEffect(() => {
        
        storage.refFromURL("gs://waldoapp.appspot.com/smallone.jpg") 
        .getDownloadURL()
          .then((url) => {
            
            setlevelOnePreview(url);
          })
          storage.refFromURL("gs://waldoapp.appspot.com/smallone-part2.jpg") 
        .getDownloadURL()
          .then((url) => {
           
            setlevelTwoPreview(url);
          })
          const getLeader = () => {
            return new Promise((resolve) => {
              const dataFor = db.ref("Leaderboard");
              dataFor.once('value').then(function (snapshot) 
              {
                const content = Object.keys(snapshot.val()).map(function (key) {
                    return snapshot.val()[key];
                  })
                  setleaderBoard(content)
                  console.log(content)
                  return resolve(content)  
                });
            })
           }
      
          getLeader();
      }, [setleaderBoard]);
       
      

      const restartGame = ()=> {
        setstartMenu(true)
        setuserName("")
        setlevel(null)
        return resetGame()
      }
      
    return(
      <div>
          <div>{startMenu ? 
          <div className="startDisplay" >
            <h1>Can you find all the hidden characters?</h1>
            <h2>Enter your name and select a level to begin...</h2>
          <form onSubmit = {handleSubmit}>
            <input onChange = {(e) => setuserName(e.target.value)} value = {userName}></input>
            <button disabled={!userName} name="sam" type ='submit'>Start Game</button>
            
            
            
          </form>
          <div className="img">
          <div className="con" ><button  onClick={(e) => {select('left')}}>Level 1</button><img  src={levelOnePreview} alt="" /></div>
            <div className="con"><button  onClick={(e) => {select('right')}}>Level 2</button><img  src={levelTwoPreview} alt="" /></div>
            </div>

          <p>Art by <a href="https://www.artstation.com/artwork/Z5VrOm">Egor Klyuchnyk</a></p>
          </div>: null}
        </div>
        <div>{leaderBoard.length !== 0 && score !== 0 ? 
          <div className="leaderDisplay" >
           <h1>Leaderboard</h1>
           <button onClick={addName}>Add Name</button>
           <button onClick={restartGame}>Reset Game</button>
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