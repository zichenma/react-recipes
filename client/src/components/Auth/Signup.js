import React from 'react';

class Signup extends React.Component {
    render() {
        return (
            <div className="App">
                <h2 className="App">Signup</h2>
                <form className="form">
                    <input type="text" name="username" placeholder="username" />
                    <input type="email" name="email" placeholder="email address" />
                    <input type="password" name="password" placeholder="password" />
                    <input type="password" name="passwordConfirmation" placeholder="Confirm Password" />
                    <button type="submit" className="button-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Signup;