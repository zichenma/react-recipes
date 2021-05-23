import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../../queries';
import Error from '../../components/Error';



function Signup() {
    const initialState = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    };
    const [formData, setFormData] = useState({...initialState});
    const [gqlError, setError] = useState();
    const [gqlLoading, setGqlLoading] = useState(false);
    

    const [ mutate ] = useMutation(SIGNUP_USER);

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData({...formData, [name] : value });
    }

    const clearState = () => {
        setFormData(initialState);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const { username, email, password } = formData;
        
        try {
            const { loading } = await mutate({variables : { username, email, password } });
            setGqlLoading(loading);
        } catch (e) {
            setError(e);
        }
        clearState();
    }

    const validateForm = function() {
        const { username, email, password, passwordConfirmation } = formData;
        const isInvalid = !username || !email || !password || (password !== passwordConfirmation);
        return isInvalid;
    }

    return (
        <div className="App">
            <h2 className="App">Signup</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="username" value={formData.username} onChange={handleChange}/>
                    <input type="email" name="email" placeholder="email address" value={formData.email} onChange={handleChange}/>
                    <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange}/>
                    <input type="password" name="passwordConfirmation" placeholder="Confirm Password" value={formData.passwordConfirmation} onChange={handleChange}/>
                    <button type="submit" className="button-primary" disabled={ gqlLoading || validateForm() }>Submit</button>
                    { gqlError && <Error error={gqlError } />}
                </form>
        </div>
    )
}


export default Signup;