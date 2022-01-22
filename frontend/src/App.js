
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NotesState';

import { useState } from 'react'

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {


    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>


        <BrowserRouter>
          <Navbar sitename="iNotebook" />
          <Alert alert={alert} />
          <Routes>
            <Route path="/home" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>

        </BrowserRouter>

      </NoteState>
    </>
  );
}

export default App;
