import React from 'react';

import { useQuery } from '@apollo/client';

import { GET_CURRENT_USER } from '../queries';


const withSession = Component => props => {
    const { data, loading, refetch } = useQuery(GET_CURRENT_USER);
    if (loading) return null;
    console.log('front end', data);
    return <Component {...props} refetch={refetch}/>;
};

   


export default withSession;