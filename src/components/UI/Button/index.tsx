import { ReactNode } from 'react';
import './index.css';

type buttonProps = {
  children: ReactNode,
  style?: React.CSSProperties
  onClick?: () => void
}

function Button({ children, style, onClick }: buttonProps) {
  return (
    <button
      className='ui-button'
      style={style}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;