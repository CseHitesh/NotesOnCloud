import React from 'react'
import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext.js';
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {


    const context = useContext(noteContext)
    const { signupByContext } = context
    const navigate = useNavigate();
    const [credientials, setcredientials] = useState({ name: "", semail: "", spassword: "" })



    const onChange = (e) => {
        setcredientials({ ...credientials, [e.target.name]: e.target.value })
    }

    const signUp = async (e) => {

        const { name, semail, spassword } = credientials;


        e.preventDefault();

        const responseOfServer = await signupByContext(name, semail, spassword)
        if (responseOfServer.authToken) {
            localStorage.setItem('authToken', responseOfServer.authToken);
            navigate('/home')
            props.showAlert("user is created sucessfully", "success")
        } else {
            props.showAlert("Invalid crediancials", "danger")
        }




    }






    return (
        <div className='container my-5'>
            <form onSubmit={signUp}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credientials.name} onChange={onChange} id="name" name='name' aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credientials.semail} onChange={onChange} id="semail" name='semail' aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credientials.spassword} onChange={onChange} name='spassword' id="spassword" />
                </div>

                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup
