import icon from "../../assests/icon.png"
import './index.css';

function Footer() {
    return (
        <div className='Footer'>
            <div style={{display:"flex",flexDirection:"row"}}>
            <img src={icon} alt="icon"width="40"/>
            <h1
                style={{ color: "aliceblue", fontSize: "1.5rem", fontFamily: 'Bagel Fat One', fontWeight: "400" }}
            >ASH<span
                style={{ color: "rgb(3, 173, 99)", fontSize: "1.5rem", fontFamily: 'Bagel Fat One', fontWeight: "400" }}
            >STREAM</span></h1 >
            </div>
            <div>
                <p>Powered by <span>Ashwin</span> </p>
            </div>
        </div>
    );
}

export default Footer;