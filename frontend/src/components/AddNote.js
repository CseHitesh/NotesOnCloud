import { React, useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [newNote, setnewNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(newNote.title, newNote.description, newNote.tag);
        setnewNote({ title: "", description: "", tag: "" })
        props.showAlert("Note added successfully", "success")
    }
    const onChange = (e) => {
        setnewNote({ ...newNote, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container my-5">
                <h2>Add Notes</h2>
                <form>
                    <div className="mb-3">
                        <label forhtml="title" className="form-label">Title</label>
                        <input type="text" className="form-control" name="title" value={newNote.title} minLength={3} id="title" aria-describedby="emailHelp" onChange={onChange} />
                    </div>

                    <div className="mb-3">
                        <label forhtml="description" className="form-label">Description</label>
                        <input type="text" className="form-control" minLength={5} value={newNote.description} name='description' id="description" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label forhtml="description" className="form-label">Tag</label>
                        <input type="text" className="form-control" name='tag' value={newNote.tag} id="tag" onChange={onChange} />
                    </div>

                    <button type="submit" className={`btn btn-primary ${(newNote.title.length <= 3 || newNote.description.length <= 5) && 'disabled'}`} onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
