import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { SEARCH_RECIPE } from '../../queries';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const { loading, error, data } = useQuery(SEARCH_RECIPE, {variables: searchTerm });

    const handleOnChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
    }

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error</p>;
    console.log(data);
    return (
        <div className="App">
            <input type="search" value={searchTerm} onChange={handleOnChange}/>
            <ul>
                {
                   data.searchRecipes.map(recipe => {
                       return(
                        <li key={recipe._id}>
                            <Link to={`/recipes/${recipe._id}`}><h4>{recipe.name}</h4></Link>
                            <p>{recipe.likes}</p>
                        </li>
                       )
                   }) 
                }
            </ul>
        </div> 
    )
};

export default Search;