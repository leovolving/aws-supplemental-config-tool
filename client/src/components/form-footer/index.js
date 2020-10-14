import { h } from 'preact';
import Button from '../button';
import Message from '../message';
import Text from '../text';
import style from './style.css'

const FormFooter = (props) => {
    const { isSuccess, onCancel, onMessageClose } = props;
    return (
        <section className={style.formFooter}>
            <Text element="h4">
                Review your changes and make sure everything is correct. You can submit or cancel here.
            </Text>
            {isSuccess && 
                <Message
                    type="success"
                    text="Your changes were saved to the server. Hooray!"
                    onClose={onMessageClose}

                />
            }
            <div className={style.buttonContainer}>
                <Button actionType="confirm">Submit</Button>
                <Button htmlType="button" onClick={onCancel}>Reset</Button>
            </div>
        </section>
    );
}

export default FormFooter;