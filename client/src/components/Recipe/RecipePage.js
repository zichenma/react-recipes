import React from 'react';
import { useRouteMatch } from 'react-router-dom';

const RecipePage = () => {
    const match = useRouteMatch();
    const { _id } = match.params;
    return (
        <div>Recipe Page</div>
    )
}
export default RecipePage;