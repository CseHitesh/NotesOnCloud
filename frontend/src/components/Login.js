import React from 'react'
import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext.js';
import { useNavigate } from 'react-router-dom';



const Login = (props) => {



    const context = useContext(noteContext)
    const { loginByContext } = context
    const navigate = useNavigate();
    const [credientials, setcredientials] = useState({ email: "", password: "" })

    const loginUser = async (e) => {

        const { email, password } = credientials;
        e.preventDefault();

        const responseOfServer = await loginByContext(email, password)
        if (responseOfServer.loginStatus) {
            localStorage.setItem('authToken', responseOfServer.authToken);
            navigate('/home')
         
            props.showAlert("you are Logged in sucessfully", "success")
        } else {
            props.showAlert("Invalid crediancials", "danger")
        }
    }


    const onChange = (e) => {
        setcredientials({ ...credientials, [e.target.name]: e.target.value })
    }




    return (
        <div className='container my-5'>
            <form onSubmit={loginUser}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credientials.email} id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credientials.password} name='password' id="password" onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
