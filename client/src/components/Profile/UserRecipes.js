import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_RECIPES } from '../../queries'
import { Link } from 'react-router-dom';

 
const UserRecipes = ({ username }) => {
    
    const { loading, error, data } = useQuery(GET_USER_RECIPES,  {variables: { username } });

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error</p>;
    return (
        <ul>
        <h3>You Recipes</h3>
        {
            data.getUserRecipes && data.getUserRecipes.map(recipe => (
                <li key={recipe._id}>
                    <Link to={`/recipes/${recipe._id}`}><p>{ recipe.name }</p></Link>
                    <p>{ recipe.likes }</p>
                </li>
            ))
        }
        </ul>
    )
}

export default UserRecipes;