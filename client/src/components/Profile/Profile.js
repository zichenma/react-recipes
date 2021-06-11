import React from 'react';
import UserInfo from './Userinfo';

const Profile = ({ session }) => (
    <div>
        <UserInfo session={session}/>
    </div>
);

export default Profile;