var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(multer().any());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/fileanalyse', function (req, res) {
  if (req.files) {
    console.log(req.files);
    res.json({
      name: req.files[0].originalname,
      type: req.files[0].mimetype,
      size: req.files[0].size
    })
  } else {
    res.json({
      error: 'No file uploaded'
    });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
