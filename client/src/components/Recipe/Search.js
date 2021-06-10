import React, { useState } from 'react';
import { useQuery, ApolloConsumer } from '@apollo/client';
import { Link } from 'react-router-dom';
import { SEARCH_RECIPE } from '../../queries';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const { loading, error, data } = useQuery(SEARCH_RECIPE, {variables: searchTerm });

    const handleOnChange = async (event, client) => {
        const { value } = event.target;
        event.persist();
        setSearchTerm(value);
        const { data } = await client.query({
            query: SEARCH_RECIPE,
            variables: { searchTerm }
        })
        const { searchRecipes } = data;
        setSearchResults(searchRecipes);
    }

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error</p>;

    return (
        <ApolloConsumer>
          {
              client => (
                <div className="App">
                    <input type="search" value={searchTerm} onChange={event => handleOnChange(event, client)} placeholder="Search for Recipes"/>
                    <ul>
                        {
                        searchResults.map(recipe => {
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
          } 
        </ApolloConsumer>
    )
};

export default Search;