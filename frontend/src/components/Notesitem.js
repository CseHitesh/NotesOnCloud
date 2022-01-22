import { React, useContext } from 'react'
import noteContext from '../context/notes/noteContext';
const Notesitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { Notes, update } = props;



    return (

        <>
            <div className="card col-md-3 mx-1">
               
                <div className="card-body">
                    <div className="d-flex">

                        <h5 className="card-title">{Notes.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={() => {
                            deleteNote(Notes._id)
                            props.showAlert("Note deleted sucessfully", "success")
                        }

                        }></i>
                        <i className="far fa-edit mx-2" onClick={() => { update(Notes) }}></i>
                    </div>
                    <p className="card-text">{Notes.description}</p>
                   
                </div>
            </div>
        </>
    )
}

export default Notesitem;
