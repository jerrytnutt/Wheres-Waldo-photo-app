import { useState,useEffect } from 'react/';
import {db} from "../firebase_config.js"
//https://dc.fandom.com/wiki/Adam_West
//https://villains.fandom.com/wiki/Kratos/Gallery?file=Kratos_Headshot.jpg
//https://spiderman.fandom.com/wiki/Peter_Parker_(Earth-616)
const Header = ({characterArray,isActive,setisActive}) => {
   const [seconds, setSeconds] = useState(0);
   useEffect(() => {
    
      
      if (seconds >= 0 && characterArray.length > 0) {
        setTimeout(() => {
          db.ref('Time').update({
            clock: seconds
          })
          setSeconds(seconds + 1)

        }, 1000);
      } else {
        setSeconds(0);
        db.ref('Time').update({
          clock: 0
        })
      }
    },[seconds,characterArray])
        
    let className = 'miss';
    if (isActive) {
      className = 'miss-active';
      setTimeout(() => setisActive(false),5000)
    } 
    return(
        <div className='header'>
          <div className={className}></div>
            
        <div className="imageContainer">
       
        {characterArray.map((x) => {
            
            return <div  key={x.Location.x1}><img className="charImage"  src={x.image} alt=''></img></div>
        })}
        
        
        </div>

        <div>{characterArray.length > 0 ? <div className='timer'>{seconds}</div> : null}</div> 
        
        </div>
    )
}
export default Header