import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_RECIPE, LIKE_RECIPE, UNLIKE_RECIPE } from '../../queries'
import withSession from '../withSession';




const LikeRecipe = ({session, _id, refetch }) => {
    const [username, setUsername] = useState('');
    const [liked, setLiked] = useState(false);

    const [ likeMutate ]= useMutation(LIKE_RECIPE);
    const [ unlikeMutate ]= useMutation(UNLIKE_RECIPE);
  
    useEffect(() => {
        if (session.getCurrentUser) {
            const { username, favorites } = session.getCurrentUser;
            // make sure we cannot like it again
            const prevLiked = favorites.findIndex(favorite => favorite._id === _id) > -1;
            setLiked(prevLiked);
            setUsername(username);
        }
    },[username]);

    const updateLike  = (cache, {data : { likeRecipe }}) => {
        const { getRecipe } = cache.readQuery({query: GET_RECIPE, variables: {_id} });
        cache.writeQuery({
            query: GET_RECIPE,
            variables: { _id },
            data: {
              getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 }  
            }
        })
    }

     const updateUnLike = (cache, {data : { unlikeRecipe }}) => {
        const { getRecipe } = cache.readQuery({query: GET_RECIPE, variables: {_id} });
        cache.writeQuery({
            query: GET_RECIPE,
            variables: { _id },
            data: {
              getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 }  
            }
        })
    }

    const handleLike = async () => {
        setLiked(!liked);
        if (!liked) {
            try {
                await likeMutate({ variables: { _id, username }, update: updateLike  });
            } catch (e) {
                console.error(e);
            }
        } else {
            try {
                await unlikeMutate({ variables: { _id, username }, update: updateUnLike });
            } catch (e) {
                console.error(e);
            }
        }
        await refetch();
    }

    return(
        username && (
            <button className="like-button" onClick={handleLike}>
                {liked ? 'Unlike' : 'Like'}
            </button>  
        )
    )
}

export default withSession(LikeRecipe);