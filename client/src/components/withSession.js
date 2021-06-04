import React from 'react';

import { useQuery } from '@apollo/client';

import { GET_CURRENT_USER } from '../queries';


const withSession = Component => props => {
    const { data } = useQuery(GET_CURRENT_USER);
    console.log('front end', data);
    return <Component {...props} />;
};

   


export default withSession;