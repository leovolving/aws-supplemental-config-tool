import { h } from 'preact';
import style from './style.css';

const Button = props => {
    const { htmlType='submit', actionType='', onClick, children, className='' } = props;
    const classNames = `${style.button} ${style[actionType]} ${className}`;

    return <button className={classNames} onClick={onClick} type={htmlType}>{children}</button>
}

export default Button;