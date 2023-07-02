import loader from "../../assests/loader.gif"
import './index.css';

function Loader() {
    return (
        <div className='loader'>
            <img width="400" src={loader} alt='loader' />
        </div>
    );
}

export default Loader;