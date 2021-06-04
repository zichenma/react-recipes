import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import withSession from './components/withSession';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';



const httpLink = createHttpLink({
  uri: 'http://localhost:4444/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError);
    }
  }
})

const Root = () => (
    <Router>
     <Switch>
       <Route path="/" exact component={App} />
       <Route path="/signin" component={Signin} />
       <Route path="/signup" component={Signup} />
       <Redirect to="/" />
     </Switch>
  </Router>
)

const RootWithSession = withSession(Root);


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      < RootWithSession />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

