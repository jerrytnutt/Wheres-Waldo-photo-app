//https://dc.fandom.com/wiki/Adam_West
//https://villains.fandom.com/wiki/Kratos/Gallery?file=Kratos_Headshot.jpg
//https://spiderman.fandom.com/wiki/Peter_Parker_(Earth-616)
const Header = (props) => {
         
         
            
         
    return(
        <div>
            
        <div className="imageContainer">
       
        {props.characterArray.map((x) => {
            
            return <div key={x.Location.x1}><img  src={x.image} alt=''></img></div>
        })}
        
        </div>



        </div>
    )
}
export default Header