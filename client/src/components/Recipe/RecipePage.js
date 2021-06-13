import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_RECIPE } from '../../queries';
import LikeRecipe from './LikeRecipe';

const RecipePage = ({refetch}) => {
  
    const match = useRouteMatch();
    const { _id } = match.params;
    const { loading, error, data } = useQuery(GET_RECIPE,  {
        variables: { _id },
      });

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error</p>;
    
    return (
       <div className="App">
           <h2>{ data.getRecipe.name }</h2>
           <p> Category: { data.getRecipe.category }</p>
           <p> Description: { data.getRecipe.description }</p>
           <p> Instructions: { data.getRecipe.instructions }</p>
           <p> Likes: { data.getRecipe.likes }</p>
           <p> Created By: { data.getRecipe.username }</p>
           <LikeRecipe _id={_id} refetch={refetch}/>
       </div>
    )
}
export default RecipePage;