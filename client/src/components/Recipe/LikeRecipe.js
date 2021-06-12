import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LIKE_RECIPE } from '../../queries'
import withSession from '../withSession';




const LikeRecipe = ({session, _id, refetch }) => {
    const [username, setUsername] = useState('');
    const [liked, setLiked] = useState(false);

    const [ mutate ]= useMutation(LIKE_RECIPE);
  
    useEffect(() => {
        if (session.getCurrentUser) {
            const { username, favorites } = session.getCurrentUser;
            // make sure we cannot like it again
            const prevLiked = favorites.findIndex(favorite => favorite._id === _id) > -1;
            setLiked(prevLiked);
            setUsername(username);
        }
    },[username]);

    const handleLike = async () => {
        setLiked(!liked);
        if (!liked) {
            try {
                await mutate({ variables: { _id, username } });
                
            } catch (e) {
                console.error(e);
            }
            // must be await
           await refetch();
        } else {
            // unlike will be here
            console.log('unlike')
        }
    }

    return(
        username && (
            <button onClick={handleLike} >
                {liked ? 'Liked' : 'Like'}
            </button>  
        )
    )
}

export default withSession(LikeRecipe);