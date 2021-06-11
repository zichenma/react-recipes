import React from 'react';
import UserInfo from './Userinfo';
import UserRecipes from './UserRecipes';

const Profile = ({ session }) => (
    <div className="App">
        <UserInfo session={session}/>
        { session.getCurrentUser && <UserRecipes username={session.getCurrentUser.username}/> }
    </div>
);

export default Profile;