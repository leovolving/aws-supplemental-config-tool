import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import FormErrorMessage from '../form-error-message';
import FormFooter from '../form-footer';
import FormSection from '../form-section';

const Form = (props) => {
    const { data, properties } = props;

    const [isSuccess, setSuccess] = useState(false);
    const [errors, setErrors] = useState([]);
    const [values, setValues] = useState({});

    const unsetSuccess = () => setSuccess(false);

    const onChange = e => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});
    }

    const onSubmit = async e => {
        unsetSuccess();
        resetErrors();
        e.preventDefault();

        const { getAccessTokenSilently } = useAuth0();
        const token = await getAccessTokenSilently();
        const fetchOptions = {
            body: JSON.stringify(values),
            headers: {
                authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }

        fetch(`${process.env.PREACT_APP_API_DOMAIN}/config`, fetchOptions)
        .then(async res => {
            if (res.status >= 200 && res.status <= 299) {
                setSuccess(true);
            } else {
                const response = await res.json()
                throw response;
            }
        })
        .catch(setErrors)
    }

    const resetErrors = () => setErrors([]);

    const resetForm = () => {
        const flattenedData = data.map(d => [...d[2]][0]);
        const newValues = flattenedData.reduce((acc, d) => {
            acc[d.name] = properties[d.name];
            return acc;
        }, {});

        setValues(newValues);
    }

    useEffect(() => {
        return resetForm();
    }, []);

    return (
        <Fragment>
            {!!errors.length && <FormErrorMessage errors={errors} />}
            <form onSubmit={onSubmit}>
                {data.map(s => <FormSection section={s} values={values} onChange={onChange} />)}
                <FormFooter onCancel={resetForm} isSuccess={isSuccess} onMessageClose={unsetSuccess} />
            </form>
        </Fragment>
    );
}

export default Form;