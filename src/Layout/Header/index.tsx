import { Link } from 'react-router-dom';
import './index.css';

function Header() {
    return (
        <header className='header-main-container'>
            <div className='header-container'>
                <h1
                    style={{ color: "aliceblue", fontSize: "1.5rem", fontFamily: 'Bagel Fat One', fontWeight: "400" }}
                >ASH<span
                    style={{ color: "rgb(3, 173, 99)", fontSize: "1.5rem", fontFamily: 'Bagel Fat One', fontWeight: "400" }}
                >STREAM</span></h1 >
                <ul>
                    <li><Link to="/search">
                    <span
                        style={{ color: "rgb(3, 173, 99)", fontSize: "2rem",  fontWeight: "bolder" }}
                        className="material-symbols-outlined">
                        search
                    </span>
                    </Link></li>
                </ul>
            </div>
        </header>

    );
}

export default Header;