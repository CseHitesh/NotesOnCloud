import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar(props) {

    const navigate = useNavigate();

    const location = useLocation();
    useEffect(() => {


    }, [location])

    const logout = () => {
        localStorage.removeItem('authToken');

        navigate('/home')
    }


    return (
        <>
            <nav className={` navbar navbar-expand-lg navbar-dark bg-dark `} >
                <div className="container-fluid ">
                    <Link className="navbar-brand" to="/">{props.sitename}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/home" && "active"}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" && "active"}`} aria-current="page" to="/about">About</Link>
                            </li>

                        </ul>


                        {!localStorage.getItem('authToken') ? <form className="d-flex">
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                        </form>
                            :

                            <Link className="btn btn-primary mx-4" to="/signup" onClick={logout} role="button">Logout</Link>}



                    </div>
                </div>
            </nav>
        </>
    )


}

export default Navbar
