import { h } from 'preact';
import './style.css';

const Text = props => {
    const { children, className='', color, element='p' } = props;

    let combinedClassNames = `text ${element} ${className} `;
    if (color) combinedClassNames += color;

    return h(element, {className: combinedClassNames}, children);
}

export default Text;