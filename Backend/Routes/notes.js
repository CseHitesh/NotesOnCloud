const express = require('express');
const note = require('../Models/Notes');
const router = express.Router();
const fetchuser = require('../Middleware/fetchUser')
const { body, validationResult } = require('express-validator');



//Route 1:  fetching all notes of a user  using :get-> "/api/notes/fetchallnotes" ,  login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {


    try {
        const notes = await note.find({ user: req.User.id })
        res.json(notes)

    } catch (error) {
        res.status(500).send("internal server error");
    }

})


//Route 2 add notes  using :POST-> "/api/notes/addNotes" 
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            console.log(req.User.id);
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const noteVariable = new note({
                title, description, tag, user: req.User.id
            })
            const savedNote = await noteVariable.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

//Route 3 update notes  using :Put-> "/api/notes/updateNote" 

router.put('/updateNote/:id',
    fetchuser,
    [body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })],
    async (req, res) => {


        try {
            const { title, description, tag } = req.body;
            //create a new note object
            const newNote = {};
            if (title) newNote.title = title;
            if (description) newNote.description = description;
            if (tag) newNote.tag = tag;

            //find the note to be updated and update it

            let Note = await note.findById(req.params.id);
            if (!Note) {
                { return res.status(404).send("Not Found") }
            }
            console.log(Note.user.toString());
            if (Note.user.toString() !== req.User.id) {
                return res.status(401).send("Not Allowed");
            }



            Note = await note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json({ Note });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


//Route 4 update notes  using :Delete-> "/api/notes/deletenote" 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let Note = await note.findById(req.params.id);
        if (!Note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (Note.user.toString() !== req.User.id) {
            return res.status(401).send("Not Allowed");
        }

        Note = await note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;