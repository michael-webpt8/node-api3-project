import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from './User';

const Users = props => {
    const [user, userSet] = useState();

    useEffect(() => {
        axios.get('http://localhost:4000/users')
            .then(res => {
                userSet(res.data)
            })
            .catch(err => {
                console.log('err', err);
            })
    }, [])
    if (!user) return <h2>Loading...</h2>
    return (
        <>
            <h2>Users</h2>
            {user.map(user => {
                return <User key={user.id} name={user.name} />
            })}
        </>
    )
}
export default Users;