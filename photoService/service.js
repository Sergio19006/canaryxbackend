var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var cors = require('cors');
var fileUpload = require('express-fileupload');
var fs = require("fs");
var pdf = require("html-pdf");

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

app.post('/qrcodes', function (req, res) {

  const { qrcode, email } = req.body

  fs.writeFileSync(
    `/home/sergio/data/qrcode/${email}.out.png`,
    qrcode.split(",")[1],
    "base64"
  );
});

app.post('/createPDF', function (req, res) {

  const { email } = req.body
  const path = `/home/sergio/data/qrcode/${email}.out.png`;

  const contenido = `
  <div id="pageHeader" style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">
    <img src="https://user-images.githubusercontent.com/2210413/47602244-19fe4f80-da17-11e8-9edf-015b48a6b9c9.png" width="150" height="27" align="left">
    <p style="color: #666; margin: 0; padding-top: 12px; padding-bottom: 5px; text-align: right; font-family: sans-serif; font-size: .85em">
      Canary Xperience
    </p>
    <h1> Punchase confirmation</h1>  
    <img style="heigth:120px; width:120px;" src="${path}">Aqui va la imagen xD ${path}</img>
  </div>
  <div id="pageFooter" style="border-top: 1px solid #ddd; padding-top: 5px;">
    <p style="color: #666; margin: 0; padding-bottom: 5px; text-align: right; font-family: sans-serif; font-size: .65em">Página {{page}} de {{pages}}</p>
  </div>
      `;

  const options = {
    format: "A4",
    header: {
      height: "60px"
    },
    footer: {
      height: "22mm"
    }
  };

  pdf
    .create(contenido, options)
    .toFile(`/home/sergio/data/pdfs/Trip Ticket ${email}.pdf`, (err) => {
      if (err) console.log(err);
      else {
        res.status(200).send();
      }
    });
});



app.listen(1234, function () {
  console.log('Example app listening on port 1234!');
});