import React, { Fragment } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_RECIPE } from '../../queries';

const RecipePage = () => {
  
    const match = useRouteMatch();
    const { _id } = match.params;
    const { loading, error, data } = useQuery(GET_RECIPE,  {
        variables: { _id },
      });

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error</p>;
    console.log('recipe data (recipePage): ', data)
    return (
       <div>Recipe Page</div>
    )
}
export default RecipePage;