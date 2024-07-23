import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { authContex } from '../context/authContext';
import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
    const loggedUser = useContext(authContex)
    const navigate = useNavigate();

    const location = useLocation()
    useEffect(() => {
        console.log(location.pathname)
    }, [location])

    function logoutHandle() {
        localStorage.removeItem('nutrify');
        loggedUser.setLoggedUser(null)
        navigate('/login')

    }
    return (
        <div className="header-container">
            <div className="header-parent">
                <ul>
                    <li> <Link to='/' className={`header-link ${location.pathname === '/' ? "active" : ""}`}>Nutrify</Link> </li>
                    <li> <Link to='/checkyourmacros' className={`header-link ${location.pathname === '/checkyourmacros' ? "active" : ""}`}>Check Your Macros</Link> </li>
                    <li> <Link to='/register' className={`header-link ${location.pathname === '/register' ? "active" : ""}`}>Register</Link> </li>
                    <li> <Link to='login' className={`header-link ${location.pathname === '/login' ? "active" : ""}`}>Login</Link> </li>
                    <li onClick={logoutHandle}> <Link to='logout' className={`header-link ${location.pathname === '/logout' ? "active" : ""}`}>Logout</Link> </li>
                </ul>
            </div>
        </div>
    )
}

export default Header