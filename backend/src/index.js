const path = require('path')
const express = require("express");
const routes = require("./routes");
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

routes(app);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
