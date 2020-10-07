import { h } from 'preact';
import Button from '../button';
import Text from '../text';
import style from './style.css'

const preventDefault = e => e.preventDefault();

const FormFooter = () => (
    <section className={style.formFooter}>
        <Text element="h4">
            Review your changes and make sure everything is correct. You can submit or cancel here.
        </Text>
        <div className={style.buttonContainer}>
            <Button actionType="confirm" onClick={preventDefault}>Submit</Button>
            <Button htmlType="button" onClick={preventDefault}>Reset</Button>
        </div>
    </section>
);

export default FormFooter;