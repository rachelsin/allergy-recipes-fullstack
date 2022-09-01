const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require("cors");
dotenv.config();
const router = require('./routes/api');

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONECCT, connectionParams)
    .then(() => {
        console.log('Connected to database')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. ${err}`);
    });
app.use(cors());
app.use(bodyParser.json());

app.use('/', router)


app.listen(5001, () => {
    console.log('listen');
});

