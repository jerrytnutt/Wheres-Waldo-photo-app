import { useState,useEffect } from 'react/';
//https://dc.fandom.com/wiki/Adam_West
//https://villains.fandom.com/wiki/Kratos/Gallery?file=Kratos_Headshot.jpg
//https://spiderman.fandom.com/wiki/Peter_Parker_(Earth-616)
const Header = ({characterArray}) => {
   const [seconds, setSeconds] = useState('');

    useEffect(() => {
       
        
      if (seconds >= 0 && characterArray.length > 0) {
        
        setTimeout(() => setSeconds(seconds + 1), 1000);
      } else {
        setSeconds(0);
      }
    },[seconds,characterArray])
            
         
    return(
        <div className='header'>
            
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