import React from 'react';
import { useHistory } from 'react-router-dom';
import { ApolloConsumer } from '@apollo/client';



const Signout = () => {
const history = useHistory();

const handleSignout = client => {
    localStorage.setItem('token', '');
    client.resetStore();
    history.push('/');
}

return (
 <ApolloConsumer>
     { client => {
        return (
            <button onClick={() => handleSignout(client)}>Signout</button>
        )
     }}
 </ApolloConsumer>
)
}

export default Signout;