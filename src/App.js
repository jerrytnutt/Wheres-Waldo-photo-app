import './App.css';
import { useState } from 'react/';
import {storage,db} from "./firebase_config.js"
import Header from "./components/header.js"
import Display from "./components/display.js"

//Egor Klyuchnyk
//leaderboard and help images

function App() {
  const [characterArray,setCharacterArray] = useState([])
  const [imageUrl, setImageUrl] = useState(undefined);
  
  const openRead = () => {
    storage.refFromURL("gs://waldoapp.appspot.com/egor-klyuchnyk-character.jpg") //name in storage in firebase console
    .getDownloadURL()
        .then((url) => {
          console.log(url)
          setImageUrl(url);
        })
        
      
  };
  const readSum = () => {
    let ar = []
    const dataFor = db.ref('Characters');
    dataFor.on('value', (snapshot) => {
        
        snapshot.forEach(data => {
          
          ar.push(data.val().image)
          setImageUrl(ar[0])
        })
      })
      
  }
  return (
    
    <div className="App" >
      <Header/>
      <button className='y' onClick={openRead}>Button</button>
      <div></div>
      <button onClick={readSum}>readsum</button>
      <div className='l'><img src={imageUrl} alt=''></img></div>
      <Display imageUrl={imageUrl}/>
    </div>
  );
}
export default App;