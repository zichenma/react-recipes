import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_RECIPE } from '../../queries';
import LikeRecipe from './LikeRecipe';
import Spinner from '../Spinner';

const RecipePage = ({refetch}) => {
  
    const match = useRouteMatch();
    const { _id } = match.params;
    const { loading, error, data } = useQuery(GET_RECIPE,  {
        variables: { _id },
    });

    if (loading) return <Spinner />;
    if (error) return <p>Error</p>;
    
    return (
       <div className="App">
           <div 
            style={{
                background: `url(${
                  data.getRecipe.imageUrl
                }) center center / cover no-repeat`
              }}
           className="recipe-image">
           </div>
           <div className="recipe">
               <div className="recipe-header">
                   <h2 className="recipe-name">
                       <strong>
                       { data.getRecipe.name }
                       </strong>
                   </h2>
                   <h5>
                       <strong>
                       { data.getRecipe.category }
                       </strong>
                   </h5>
                   <p>
                   Created By: { data.getRecipe.username }
                   </p>
                   <p> 
                    { data.getRecipe.likes } <span role="img" aria-label="heart">♥️</span>
                   </p>
                
               </div>
               <blockquote className="recipe-description">
               { data.getRecipe.description }
               </blockquote>
               <h3 className="recipe-instruction__title">Instructions</h3>
               <div className="recipe-instructions" dangerouslySetInnerHTML={{__html : data.getRecipe.instructions}} />
               <LikeRecipe _id={_id} refetch={refetch}/>
           </div>
       </div>
    )
}
export default RecipePage;
