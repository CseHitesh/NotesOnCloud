import NoteContext from './noteContext'
import { useState } from 'react'
const NoteState = (props) => {


    const Host = "http://localhost:3001/"
    const initialNotes =
        [
            {
                "_id": "61c4099943a6c6b04d6c4af8",
                "user": "61c4089029199461b996f57b",
                "title": "Conform a project in fiver updated2",
                "description": "deliver to the client the client updated2",
                "tag": "updated2 tag ",
                "date": "2021-12-23T05:31:05.193Z",
                "__v": 0
            }
        ]

    const [Notes, setNotes] = useState(initialNotes)

    //fetchAll Notes

    const fetchnotes = async () => {
        //api call 

        const response = await fetch(`${Host}api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },

           
        });
      

        const json = await response.json();
        setNotes(json)

    }


    //add Note

    const addNote = async (title, description, tag) => {

        const data = { title, description, tag };
        //api call
        const response = await fetch(`${Host}api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },

            body: JSON.stringify(data) 
        });
       

        const json = await response.json();

        fetchnotes();


    }


    //update Note
    const updateNote = async (title, description, tag, _id) => {
        //call the api


        const data = { title, description, tag };

        const response = await fetch(`${Host}api/notes/updatenote/${_id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },

            body: JSON.stringify(data) 
        });
       

        const json = await response.json();
      

        const newNotesB = JSON.parse(JSON.stringify(Notes));

        for (let index = 0; index < newNotesB.length; index++) {
            const element = newNotesB[index];

            if (element._id === _id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }


        }

        setNotes(newNotesB)

        // fetchnotes()//here we are feching notes from the server  that is not a right way we will implement it again


    }
    //Delete Note
    const deleteNote = async (id) => {

        //api call

        const response = await fetch(`${Host}api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },


        });

        const json = await response.json();
        // console.log(json);


        // console.log("note is deleted with id of " + id);
        const newNotelist = Notes.filter((Notes) => {
            return Notes._id !== id;
        });
        // console.log(Notes._id);

        setNotes(newNotelist);
    }


    //Login

    const loginByContext = async (email, password) => {
        //api call

        const data = { email, password };
        const response = await fetch(`${Host}api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)

        });

        const json = await response.json();
        // console.log(json);
        return json;



    }

    //sign up

    const signupByContext = async (name, email, password) => {
        //api call

        const data = { name, email, password };
        const response = await fetch(`${Host}api/auth/createuser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)

        });

        const json = await response.json();
        // console.log(json);
        return json;



    }

    return (
        <NoteContext.Provider value={{ Notes, addNote, updateNote, deleteNote, fetchnotes, loginByContext, signupByContext, }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;