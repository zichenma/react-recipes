import React from 'react';

const RecipeItem = ({name, catagory}) => (
    <li> 
    <h4>{ name }</h4>
    <p><strong>{ catagory }</strong></p>
   </li>
)

export default RecipeItem;