import React from 'react';
import { Link } from "react-router-dom";

const formatDate = unixtimestamp => {
    // Months array
    const months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    // Convert timestamp to milliseconds
    const date = new Date(parseInt(unixtimestamp));

    // Year
    const year = date.getFullYear();

    // Month
    const month = months_arr[date.getMonth()];

    // Day
    const day = date.getDate();

    // Hours
    const hours = date.getHours();

    // Minutes
    const minutes = "0" + date.getMinutes();

    // Seconds
    const seconds = "0" + date.getSeconds();

    // Display date time in MM-dd-yyyy h:m:s format
    const convdataTime = month+'-'+day+'-'+year+' at '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    return convdataTime;
}


const UserInfo = ({ session }) => (
    <div className="App">
        <h3>User Info</h3>
        <p>Username: { session.getCurrentUser.username}</p>
        <p>Email: { session.getCurrentUser.email}</p>
        <p>Join Date: { formatDate(session.getCurrentUser.joinDate)}</p>
        <ul>
            <h3>{ session.getCurrentUser.username}'s Favorites</h3>
            { session.getCurrentUser.favorites.map(favorite => {
                    return(
                        <li key={favorite._id}>
                            <Link to={`/recipes/${favorite._id}`}>
                                <p>{favorite.name}</p>
                            </Link>
                        </li>
                    )
                })
            }
            {   
                !session.getCurrentUser.favorites.length && 
                <p>
                    <strong>You have no favorites currently. Go add Some!</strong>
                </p>
            }
        </ul>
    </div>
);

export default UserInfo;