const express = require('express');
const { json } = require('express/lib/response');
const connectToMongo = require('./db')
const app = express();
const cors = require('cors')

const port = 3001;


connectToMongo();
// app.get('/', (res, req) => {
//     res.send("Hitesh is now online");


// })
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./Routes/auth'));
app.use('/api/notes', require('./Routes/notes'));

app.listen(port, () => {
    console.log("server is running on port " + port);
})