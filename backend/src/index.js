const path = require('path');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const upload = multer({
    dest: path.join(__dirname, 'assets'),
});

app.post('/upload', upload.array('imgs', 10), (req, res) => {
    const files = req.files;
    if (!files) {
        return res.status(400).send({ message: 'No files uploaded' });
    }
    const fileUrls = files.map(file => `http://localhost:3001/assets/${file.filename}`);
    console.log(files);
    res.json({ fileUrls });
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));

routes(app);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
