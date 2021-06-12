import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LIKE_RECIPE } from '../../queries'
import withSession from '../withSession';




const LikeRecipe = ({session, _id}) => {
    const [username, setUsername] = useState('');
    const [ mutate ]= useMutation(LIKE_RECIPE);

    useEffect(() => {
        if (session.getCurrentUser) {
            const { username } = session.getCurrentUser;
            setUsername(username);
        }
    },[username]);

    const handleLike = async () => {
        try {
            await mutate({ variables: { _id, username } });
        } catch (e) {
            console.error(e);
        }
    }

    return(
        username && <button onClick={handleLike}>Like</button>
    )
}

export default withSession(LikeRecipe);