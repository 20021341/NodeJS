const express = require('express');
const cors = require('cors');
const routing = require('./routing');

let app = express();
let router = express.Router();

let initAPIRoutes = (app) => {
    router.get('/get-all-title', routing.getAllTitle);

    return app.use('/api', router);
}

app.use(cors({
    origin: true
}))

initAPIRoutes(app);

let port = 3000;
app.listen(port, () => {
    console.log("Backend is running at port " + port);
})