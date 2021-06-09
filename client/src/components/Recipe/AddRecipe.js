import React, { useState } from 'react';

const AddRecipe = () => {
    const [recipeInfo, setRecipeInfo] = useState({
        name : '',
        instructions : '',
        category : 'Breakfast',
        description: '',
        username: ''
    });
    const handleChange = event => {
       const { name, value } = event.target;
       setRecipeInfo({...recipeInfo, [name] : value});
    }
    const { name, category, description, instructions } = recipeInfo;
    return (<div className="App">
        <h2 className="App">Add Recipe</h2>
        <form className="form">
            <input type="text" name="name" placeholder="Recipe Name" value={name} onChange={handleChange}/>
            <select name="category" value={category} onChange={handleChange}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
            </select>
            <input type="text" name="description" placeholder="Add description" value={description} onChange={handleChange}/>
            <textarea type="text" name="instructions" placeholder="Add instructions" value={instructions} onChange={handleChange}></textarea>
            <button type="submit" className="button-primary">Submit</button>
        </form>
    </div>)
}

export default AddRecipe;