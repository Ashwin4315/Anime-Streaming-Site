import { ReactNode, useState } from 'react';
import './index.css';

type buttonProps = {
  children: ReactNode,
  style?: React.CSSProperties
  ishover?: React.CSSProperties
  onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void,
}

function Button({ children, style, onClick,ishover }: buttonProps) {

  
  const [hover, sethover] = useState(false);

  const handleMouseEnter = () => {
      sethover(true);
  };

  const handleMouseLeave = () => {
      sethover(false);
  };
  return (
    <button
      className='ui-button'
      style={{...style,...(hover ? ishover : null)}}      
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
      {children}
    </button>
  );
}

export default Button;