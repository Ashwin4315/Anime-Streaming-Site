import { ReactNode } from 'react';
import './index.css';

type cardProps ={
    children:ReactNode,
    style?:React.CSSProperties
    onClick?:()=>void
}

function Card({children,onClick,style}:cardProps){
    return (
      <div 
      className='ui-card'
      style={style}
      onClick={onClick}>{children}</div>
    );
}

export default Card;