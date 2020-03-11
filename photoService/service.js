var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var cors = require('cors');
var fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);


const corsOptions = {
  origin: ['http://localhost:8080'],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  preflightContinue: false
}

app.use(cors(corsOptions));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/photosTrip', function (req, res) {
  const imageFiles = req.files.img;
  res.send('Hello trippps!');
  for (const img of imageFiles) {
    img.mv(`/home/sergio/data/trips/${img.name}`, err => {
      if (err)
        console.log(err);
    });
  }
});

app.post('/photosUsers', function (req, res) {
  const imageFile = req.files.img;
  res.send('Hello trippps!');
  imageFile.mv(`/home/sergio/data/users/${imageFile.name}`, err => {
    if (err)
      console.log(err)
  });
});

app.listen(1234, function () {
  console.log('Example app listening on port 1234!');
});