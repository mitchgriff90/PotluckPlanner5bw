import React from 'react';
import { NavLink } from 'react-router-dom';

const styling = {
    marginLeft: 'auto',
    marginRight: '0',
    textAlign:'right',
    display:'flex',
    justifyContent:'space-between',
    width:'500px'
};

export default function NavBar(){
    return(
        <div style={ styling }>
        <NavLink to="/">Home</NavLink>
        <NavLink to='/register'>Register</NavLink>
        <span>Already have an Account?<NavLink to='/login'>Log In</NavLink></span>
        </div>
    )
}