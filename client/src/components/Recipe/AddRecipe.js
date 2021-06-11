import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE, GET_ALL_RECIPES } from '../../queries';
import Error from '../../components/Error';
import withAuth from '../withAuth';

const AddRecipe = ({ session }) => {
    const initialState = {
        name : '',
        instructions : '',
        category : 'Breakfast',
        description: '',
    };
    const [recipeInfo, setRecipeInfo] = useState({...initialState});

    const [username, setUsername] = useState('');
    const [gqlError, setError] = useState('');
    const [gqlLoading, setGqlLoading] = useState(false);
    const history = useHistory();
    const [ mutate ] = useMutation(ADD_RECIPE);
    const { name, category, description, instructions } = recipeInfo;
    

    useEffect(() => {
        session.getCurrentUser && setUsername(session.getCurrentUser.username)
    },[username])

    const handleChange = event => {
       const { name, value } = event.target;
       setRecipeInfo({...recipeInfo, [name] : value});
    }

    const clearState = () => {
        setRecipeInfo(initialState);
        setUsername('');
    }

    const validateForm = () => {
        const isInvalid = !name || !category || !description || !instructions;
        return isInvalid;
    }
    // after add new recipe and redirect to home page 
    // the newly added recipe is not getting displaied
    // so need this update function
    const updateCache = (cache,  {data : { addRecipe }}) => {
        const { getAllRecipes  } = cache.readQuery({ query : GET_ALL_RECIPES });
        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data : {
                getAllRecipes: [addRecipe, ...getAllRecipes]
            }
        })
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
          const { loading } = await mutate({
              variables : {  name, category, description, instructions, username },
              update: updateCache
            });
          setGqlLoading(loading);
        } catch (e) {
            setError(e);
        }
        clearState();
        history.push('/');
    }
    
    return (<div className="App">
        <h2 className="App">Add Recipe</h2>
        <form className="form" onSubmit={(event) => handleSubmit(event)}>
            <input type="text" name="name" placeholder="Recipe Name" value={name} onChange={handleChange}/>
            <select name="category" value={category} onChange={handleChange}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
            </select>
            <input type="text" name="description" placeholder="Add description" value={description} onChange={handleChange}/>
            <textarea type="text" name="instructions" placeholder="Add instructions" value={instructions} onChange={handleChange}></textarea>
            <button type="submit" className="button-primary" disabled={ gqlLoading || validateForm() }>Submit</button>
            { gqlError && <Error error={ gqlError } />}
        </form>
    </div>)
}

export default withAuth(session => session && session.getCurrentUser)(AddRecipe);