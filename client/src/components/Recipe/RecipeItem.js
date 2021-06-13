import React from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = recipe => {
    const { _id, name, category } = recipe.recipe;
    return (
      <ul>
        <li> 
            <Link to={`/recipes/${_id}`}>
              <h4>{ name }</h4>
            </Link>
            <p><strong>{ category }</strong></p>
        </li>
      </ul>
    )
}
export default RecipeItem;