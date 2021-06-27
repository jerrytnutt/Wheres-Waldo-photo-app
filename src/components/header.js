import batmanWest from "../images/batmanWest.jpg"
import kratos from "../images/kratos.jpg"
//https://dc.fandom.com/wiki/Adam_West
//https://villains.fandom.com/wiki/Kratos/Gallery?file=Kratos_Headshot.jpg
//https://spiderman.fandom.com/wiki/Peter_Parker_(Earth-616)
const Header = () => {
    return(
        <div>
            
        <div className="imageContainer">

        <div><img src={batmanWest} alt=''></img></div>
        <div><img src={kratos} alt=''></img></div>
        <div><img src={batmanWest} alt=''></img></div>
        </div>



        </div>
    )
}
export default Header