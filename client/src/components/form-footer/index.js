import { h } from 'preact';
import Button from '../button';
import Text from '../text';
import style from './style.css'

const FormFooter = (props) => {
    const { onCancel } = props;
    return (
        <section className={style.formFooter}>
            <Text element="h4">
                Review your changes and make sure everything is correct. You can submit or cancel here.
            </Text>
            <div className={style.buttonContainer}>
                <Button actionType="confirm">Submit</Button>
                <Button htmlType="button" onClick={onCancel}>Reset</Button>
            </div>
        </section>
    );
}

export default FormFooter;