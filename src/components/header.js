import {useEffect } from 'react/';
import {db} from "../firebase_config.js"

const Header = ({characterArray,missBox,seconds,setSeconds}) => {
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
            return <div className="holder"  key={x.Location.x1}><img className="charImage"  src={x.image} alt=''></img><p>{x.name}</p></div>
        })}
        </div>
        <div>{characterArray.length > 0 ? <div className='timer'>{seconds}</div> : null}</div> 
        </div>
    )
}
export default Header