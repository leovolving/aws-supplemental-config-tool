import { h } from 'preact';
import style from './style.css';

const Text = props => {
    const { children, className='', color, element='p', ...rest } = props;

    let combinedClassNames = `${style.text} ${style[element]} ${className} `;
    if (color) combinedClassNames += style[color];

    return h(element, {className: combinedClassNames, ...rest}, children);
}

export default Text;