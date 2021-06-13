import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_RECIPES, DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER } from '../../queries'
import { Link } from 'react-router-dom';

 
const UserRecipes = ({ username }) => {
    
    const [deleteError, setError] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);

    const { loading, error, data } = useQuery(GET_USER_RECIPES,  {variables: { username } });
    const [ mutate ] = useMutation(DELETE_USER_RECIPE, { refetchQueries : [
        { query : GET_ALL_RECIPES }, 
        { query : GET_CURRENT_USER }
    ]});


    const updateCache = (cache, {data : { deleteUserRecipe }})  => {
       const { getUserRecipes } = cache.readQuery({
           query: GET_USER_RECIPES,
           variables: { username }
       })
       cache.writeQuery({
           query: GET_USER_RECIPES,
           variables: { username },
           data: {
                getUserRecipes: getUserRecipes.filter(recipe => recipe._id !== deleteUserRecipe._id) 
           }
       })
    }

    const handleDelete = async id => {
       const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
       if (confirmDelete) {
            try {
              const { loading } = await mutate({variables : { _id: id }, update: updateCache });
              setDeleteLoading(loading);
            } catch (e) {
                setError(e);
            }
       }
    }

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error</p>;
    if (deleteError) return <p>Something wrong with deletion</p>
    return (
        <ul>
        <h3>Your Recipes</h3>
        {!data.getUserRecipes.length && <p><strong>You have not added any recipes yet</strong></p>}
        {
            data.getUserRecipes.map(recipe => (
                <li key={recipe._id}>
                    <Link to={`/recipes/${recipe._id}`}><p>{ recipe.name }</p></Link>
                    <p style={{ marginBottom :'0'}}>{ recipe.likes }</p>
                    <p className="delete-button" onClick={() => handleDelete(recipe._id)}>{deleteLoading ? 'deleting...' : 'X'}</p>
                </li>
            ))
        }
        </ul>
    )
}

export default UserRecipes;