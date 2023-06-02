const express = require('express');
const connection = require('./db/conn');
const route = require('./routes/Router');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const app = express();

const port = 8009;

connection;
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(route);

app.listen(port, () => {
    console.log(`Server start at port Number : ${port}`);
})

