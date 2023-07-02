import Header from './Header';
import './index.css';


type LayoutProps={
    children:React.ReactNode
}

function Layout({children}:LayoutProps) {

    return (
       <div>
        <Header />
        <div className='layout-content'>
            {children}
        </div>
        
       </div>
    );
}

export default Layout;