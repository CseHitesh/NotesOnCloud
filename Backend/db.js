const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
const connectToMongo = () => {
    mongoose.connect(URI, () => {
        console.log("you are connected with mongo db sucessfully");
    })
}

module.exports = connectToMongo;