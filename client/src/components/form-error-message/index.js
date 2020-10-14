import { h } from 'preact';
import Message from '../message';
import Text from '../text';
import style from './style.css';

const ErrorItem = props => {
    const { name, message } = props;
    const href = `#${name}__label`

    return (
        <Text>
            <Text element="a" href={href}>{name}</Text>
            : {message}
        </Text>
    )
}

const FormErrorMessage = props => {
    const { errors } = props;
    
    return (
        <div className={style.formErrorMessage} role="alert">
            <Message
                type="error"
                text="Something's wrong. Please fix the errors and try again."
                >
                {errors.map(ErrorItem)}
            </Message>
        </div>
    );
}

export default FormErrorMessage;