import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import FormFooter from '../form-footer';
import FormSection from '../form-section';

const Form = (props) => {
    const { data, properties } = props;
    const [values, setValues] = useState({});

    const onChange = e => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});
    }

    const onSubmit = async e => {
        e.preventDefault();
        const { getAccessTokenSilently } = useAuth0();
        const token = await getAccessTokenSilently();
        // TODO: replace with env variable once available
        fetch('http://localhost:5050/config', {
            body: JSON.stringify(values),
            headers: {
                authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
        .then(res => res.json())
        .then(res => console.log({res}))
    }

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
        <form onSubmit={onSubmit}>
            {data.map(s => <FormSection section={s} values={values} onChange={onChange} />)}
            <FormFooter onCancel={resetForm} />
        </form>
    );
}

export default Form;