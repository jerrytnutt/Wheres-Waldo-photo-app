import {useEffect } from 'react/';
import {db} from "../firebase_config.js"
//https://dc.fandom.com/wiki/Adam_West
//https://villains.fandom.com/wiki/Kratos/Gallery?file=Kratos_Headshot.jpg
//https://spiderman.fandom.com/wiki/Peter_Parker_(Earth-616)
const Header = ({characterArray,missBox,seconds,setSeconds}) => {
  
  
  useEffect(() => {
    
    
    if (seconds >= 0 && characterArray.length > 0) {
      console.log('if')
      setTimeout(() => {
        db.ref('Time').update({
          clock: seconds
          })
          setSeconds(seconds + 1)
        }, 1000);
    } else {
      console.log('else')
      setSeconds(0);
        db.ref('Time').update({
          clock: 0
        })
      }
    },[seconds,setSeconds,characterArray]) 
    let className = 'miss';
    if (missBox) {
      className = 'miss-active';
    } 
    return(
        <div className='header'>
          <div className={className}>Sorry, try again!</div>  
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