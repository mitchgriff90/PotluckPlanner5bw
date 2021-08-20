import React, { useState } from 'react';

export default function Home(){
    const [token, setToken] = useState(localStorage.getItem('token'))
    return(
        <div>
            {token && (<section className='userPage'></section>)}
            {!token && (
            <div>
            <h1>Welcome to Potluck Planner!</h1>
            <h3>With this application you can share, and plan a potluck.</h3>
            <p>Please Log In to see more!</p>
            </div>
            )}
        </div>
    )
}