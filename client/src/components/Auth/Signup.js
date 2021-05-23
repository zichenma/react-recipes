import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../../queries';



function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });
    
    const [signupUser, { data }] = useMutation(SIGNUP_USER);

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData({...formData, [name] : value });
    }

    const handleSubmit = event => {
        event.preventDefault();
        const { username, email, password } = formData;
        signupUser({variables : { username, email, password } });
        setFormData({
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        });
    }

    return (
        <div className="App">
            <h2 className="App">Signup</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="username" value={formData.username} onChange={handleChange}/>
                    <input type="email" name="email" placeholder="email address" value={formData.email} onChange={handleChange}/>
                    <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange}/>
                    <input type="password" name="passwordConfirmation" placeholder="Confirm Password" value={formData.passwordConfirmation} onChange={handleChange}/>
                    <button type="submit" className="button-primary">Submit</button>
                </form>
        </div>
    )
}


export default Signup;