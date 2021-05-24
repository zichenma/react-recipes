import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNIN_USER } from '../../queries';
import Error from '../../components/Error';



function Signin() {
    const initialState = {
        username: '',
        password: '',
    };
    const [formData, setFormData] = useState({...initialState});
    const [gqlError, setError] = useState();
    const [gqlLoading, setGqlLoading] = useState(false);
    

    const [ mutate ] = useMutation(SIGNIN_USER);

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData({...formData, [name] : value });
    }

    const clearState = () => {
        setFormData(initialState);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const { username, password } = formData;
        
        try {
            const { data, loading } = await mutate({variables : { username, password } });
            setGqlLoading(loading);
        } catch (e) {
            setError(e);
        }
        clearState();
    }

    const validateForm = function() {
        const { username, password } = formData;
        const isInvalid = !username || !password;
        return isInvalid;
    }

    return (
        <div className="App">
            <h2 className="App">Signin</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="username" value={formData.username} onChange={handleChange}/>
                    <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange}/>
                    <button type="submit" className="button-primary" disabled={ gqlLoading || validateForm() }>Submit</button>
                    { gqlError && <Error error={gqlError } />}
                </form>
        </div>
    )
}


export default Signin;