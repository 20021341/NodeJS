const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const viewEngine = require('./config/viewEngine');
const initAPIRoutes = require('./route/api');
const connectDB = require('./config/connectDB');
require('dotenv').config();

let app = express();


//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: true
}))

viewEngine(app);
initAPIRoutes(app);

connectDB();

let port = 3000;
app.listen(port, () => {
    console.log("Backend is running at port " + port);
})