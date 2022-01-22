import Notesitem from './Notesitem'
import AddNote from './AddNote'
import { React, useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';



const Notes = (props) => {

    const context = useContext(noteContext);
    const { Notes, setNotes, fetchnotes, addNote, updateNote } = context;
    const navigate = useNavigate();

    const [newNote, setnewNote] = useState({ title: "", description: "", tag: "" })
    const ref = useRef(null);
    const refClose = useRef(null);



    const update = (note) => {
        ref.current.click();
      
        setnewNote(note)


    }


    const handleClick = (e) => {
        e.preventDefault();
       
        const { title, description, tag, _id } = newNote
        // console.log(title, description, tag, _id);
        updateNote(title, description, tag, _id);
        refClose.current.click();
        props.showAlert("Note updated sucessfully", "success")


    }
    const onChange = (e) => {
        setnewNote({ ...newNote, [e.target.name]: e.target.value })
    }


    useEffect(() => {

        if (localStorage.getItem('authToken')) {
            fetchnotes()

        } else {
            navigate('/login')
        }

    }, [])


    return (
        <>
            <AddNote showAlert={props.showAlert} />

            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Your Note </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="mb-3">
                                    <label forhtml="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" name="title" value={newNote.title} id="title" aria-describedby="emailHelp" onChange={onChange} />
                                </div>

                                <div className="mb-3">
                                    <label forhtml="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={newNote.description} name='description' id="description" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label forhtml="description" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={newNote.tag} name='tag' id="tag" onChange={onChange} />
                                </div>

                            </form>



                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick} >Edit Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container my-2">
                <h2>Your Notes</h2>

                <div className="row">
                    {Notes.map((Notes) => {
                        return <Notesitem key={Notes._id} showAlert={props.showAlert} update={update} Notes={Notes} />
                    })}

                </div>

            </div>
        </>
    )

}

export default Notes
