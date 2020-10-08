import { h, Fragment } from 'preact';
import FormFooter from '../form-footer';

/*
    TODO:
        - attach onChange callbacks to all inputs so they can be tracked in <Form> state
        - callback for submitting (validate and send to db)
        - callback for cancel button (which should re-trigger the populating of the form's prev values)
*/
const Form = ({children}) => {
    return (
        <form>
            {children}
            <FormFooter />
        </form>
    )
}

export default Form;