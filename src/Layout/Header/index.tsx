import { Link } from 'react-router-dom';
import './index.css';
import Menu from '../../components/menu';
import { useState } from 'react';

function Header() {

    const [show, setShow] = useState(false)

    const showPress = () => {
        setShow(!show)
    }

    return (
        <header className='header-main-container'>
            <div className='header-container'>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div
                    style={{ display: "flex", alignItems: "center"}}
                        onClick={showPress}
                    >
                        {show ? <span
                            style={{ color:"white",fontWeight:"bolder" }}
                            className="material-symbols-outlined">
                            close
                        </span> : <span
                            style={{ cursor: "pointer",fontWeight:"bolder" }}

                            className="material-symbols-outlined">
                            menu
                        </span>}
                    </div>
                    <h1
                        style={{ color: "aliceblue", fontSize: "1.5rem", fontFamily: 'Bagel Fat One', fontWeight: "400" }}
                    >ASH<span
                        style={{ color: "rgb(3, 173, 99)", fontSize: "1.5rem", fontFamily: 'Bagel Fat One', fontWeight: "400" }}
                    >STREAM</span></h1 >
                </div>

                <ul>
                    <li><Link to="/search">
                        <span
                            style={{ color: "rgb(3, 173, 99)", fontSize: "2rem", fontWeight: "bolder" }}
                            className="material-symbols-outlined">
                            search
                        </span>
                    </Link></li>
                </ul>
            </div>
            {show && <Menu show={showPress} />}
        </header>

    );
}

export default Header;