const mongoose = require('mongoose')
const DB = "mongodb+srv://dhruv:dhruv@cluster0.xontkku.mongodb.net/Authusers"

const connection = mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("Database connected")).catch((error) => {
    console.log(error);
})

module.exports = connection;