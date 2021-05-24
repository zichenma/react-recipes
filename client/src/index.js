import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
// import ApolloClient from 'apollo-boost';
import { ApolloClient, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  // fetchOptions will allow send token to backend
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError);
    }
  }
})

const Root = () => {
  return (
    <Router>
     <Switch>
       <Route path="/" exact component={App} />
       <Route path="/signin" component={Signin} />
       <Route path="/signup" component={Signup} />
       <Redirect to="/" />
     </Switch>
  </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

