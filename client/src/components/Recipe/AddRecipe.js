import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries';
import Error from '../../components/Error';
import withAuth from '../withAuth';

const AddRecipe = ({ session }) => {
    const initialState = {
        name : '',
        imageUrl : '',
        instructions : '',
        category : 'Breakfast',
        description: '',
    };
    const [recipeInfo, setRecipeInfo] = useState({...initialState});

    const [username, setUsername] = useState('');
    const [gqlError, setError] = useState('');
    const [gqlLoading, setGqlLoading] = useState(false);
    const history = useHistory();
    const [ mutate ] = useMutation(ADD_RECIPE, { refetchQueries : [
        { 
          query : GET_USER_RECIPES,         
          variables: { username } 
        },

    ]});
    const { name, imageUrl, category, description, instructions } = recipeInfo;
    

    useEffect(() => {
        session.getCurrentUser && setUsername(session.getCurrentUser.username)
    },[username])

    const handleChange = event => {
       const { name, value } = event.target;
       setRecipeInfo({...recipeInfo, [name] : value});
    }

    const handleEditorChange = (event, editor ) => {
        const data = editor.getData();
        setRecipeInfo({...recipeInfo, instructions : data });
    }

    const clearState = () => {
        setRecipeInfo(initialState);
        setUsername('');
    }

    const validateForm = () => {
        const isInvalid = !name || !imageUrl || !category || !description || !instructions;
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
              variables : {  name, imageUrl, category, description, instructions, username },
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
            <input type="text" name="imageUrl" placeholder="Recipe Image URL" value={imageUrl} onChange={handleChange}/>
            <select name="category" value={category} onChange={handleChange}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
            </select>
            <input type="text" name="description" placeholder="Add description" value={description} onChange={handleChange}/>
            <label htmlFor="instructions">Add Instructions</label>
            <CKEditor
                editor={ ClassicEditor }
                name="instructions"
                content={instructions}
                onChange={ handleEditorChange }
            />
            <button type="submit" className="button-primary" disabled={ gqlLoading || validateForm() }>Submit</button>
            { gqlError && <Error error={ gqlError } />}
        </form>
    </div>)
}

export default withAuth(session => session && session.getCurrentUser)(AddRecipe);