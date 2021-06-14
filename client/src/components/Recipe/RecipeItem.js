import React from 'react';
import { Link } from 'react-router-dom';



const imageStyle = imageUrl => ({
  backgroundImage: `${imageUrl}`,
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
})

const RecipeItem = recipe => {
    const { _id, imageUrl, name, category } = recipe.recipe;
    return (
        <li
          style={imageStyle(imageUrl)} 
          className="card"
        >
        <span className={ category }> 
            { category } 
        </span>
        <div className="card-text">
            <Link to={`/recipes/${_id}`}>
              <h4>{ name }</h4>
            </Link>
        </div>
        </li>
    )
}
export default RecipeItem;