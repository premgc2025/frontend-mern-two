import React from 'react'
import { Link } from 'react-router-dom'
import { authContex } from '../context/authContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const loggedUser = useContext(authContex)
    const navigate = useNavigate();

    function logoutHandle(){
        localStorage.removeItem('nutrify');
        loggedUser.setLoggedUser(null)
        navigate('/login')

    }
  return (
    <div className="header-container">
        <div className="header-parent">
            <ul>
                <li> <Link className='header-link'>Home</Link> </li>
                <li> <Link to='/track' className='header-link'>Track</Link> </li>
                <li> <Link to='/foods' className='header-link'>Foods</Link> </li>
                <li> <Link to='/register' className='header-link'>Register</Link> </li>
                <li> <Link to='login' className='header-link'>Login</Link> </li>
                <li onClick={logoutHandle}> <Link to='logout' className='header-link'>Logout</Link> </li>
            </ul>
        </div>
    </div>
  )
}

export default Header