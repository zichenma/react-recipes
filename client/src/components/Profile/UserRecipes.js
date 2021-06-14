import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_RECIPES, DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER } from '../../queries'
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';

 
const UserRecipes = ({ username }) => {
    const initialState = {
        name : '',
        imageUrl : '',
        category : '',
        description: '',
    };
    const [recipeInfo, setRecipeInfo] = useState({...initialState});
    const [isOpenModal, setIsOpenModal] = useState(false);
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

    const handleChange = event => {
        const { name, value } = event.target;
        setRecipeInfo({...recipeInfo, [name] : value});
     }

    const closeModal = () => {
        setIsOpenModal(false);
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

    if (loading) return <Spinner />;
    if (error) return <p>Error</p>;
    if (deleteError) return <p>Something wrong with deletion</p>
    return (
        <ul>
        {isOpenModal && <EditRecipeModal closeModal={closeModal} handleChange={handleChange}/>}
        <h3>Your Recipes</h3>
        {!data.getUserRecipes.length && <p><strong>You have not added any recipes yet</strong></p>}
        {
            data.getUserRecipes.map(recipe => (
                <li key={recipe._id}>
                    <Link to={`/recipes/${recipe._id}`}><p>{ recipe.name }</p></Link>
                    <p style={{ marginBottom :'0'}}>{ recipe.likes }</p>
                    <button className="button-primary" onClick={() => setIsOpenModal(true)}>Update</button>
                    <p className="delete-button" onClick={() => handleDelete(recipe._id)}><strong>{deleteLoading ? 'deleting...' : 'X'}</strong></p>
                </li>
            ))
        }
        </ul>
    )
}

const EditRecipeModal = ({ handleChange, closeModal }) => (
    <div className="modal modal-open">
      <div className="modal-inner">
        <div className="modal-content">
          <form className="modal-content-inner">
            <h4>Edit Recipe</h4>
            <label htmlFor="name">Recipe Name</label>
            <input type="text" name="name" onChange={handleChange} />
            <label htmlFor="imageUrl">Recipe Image</label>
            <input type="text" name="imageUrl" onChange={handleChange} />
            <label htmlFor="category">Category of Recipe</label>
            <select name="category" onChange={handleChange}>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
            <label htmlFor="description">Recipe Description</label>
            <input type="text" name="description" onChange={handleChange} />
  
            <hr />
            <div className="modal-buttons">
              <button type="submit" className="button-primary">
                Update
              </button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  

export default UserRecipes;