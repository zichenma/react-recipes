import React, { useEffect, useState } from 'react';

import withSession from '../withSession';




const LikeRecipe = ({session}) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (session.getCurrentUser) {
            const { username } = session.getCurrentUser;
            setUsername(username);
        }
    })

    return(
        username && <button>Like</button>
    )
}

export default withSession(LikeRecipe);