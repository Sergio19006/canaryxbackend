import nodemailer from "nodemailer";
import { mongoTrip } from "../types/trip";
import createError from "http-errors";
import pdf from "html-pdf";
import QRCode from 'qrcode';

const generateQR = async text => {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error(err)
  }
}

export const handleParticipants = async (
  numberOfPersons: Number,
  trip: mongoTrip
) => {
  if (trip != null) {
    const people: number =
      numberOfPersons.valueOf() + trip.participants.valueOf();
    if (people <= trip.totalPersons.valueOf()) {
      trip.participants = people;
      await trip.save();
      return true;
    } else throw createError(403, "Trip has to much people");
  } else throw createError(411, "Trip id was wrong");
};

export const sendMail = async (email: String) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nodemail212221212@gmail.com",
      pass: ""
    }
  });




  const mailOptions = {
    from: "nodemail212221212@gmail.com",
    to: email.toString(),
    subject: "Purchase Confirmation",
    text: `This email was generated automatically. Please, do not answer this email.
If you have any question, contact with the company that proposed the trip.
We are at your entire disposal in case you need some further information.

Canary Xperience Team`,
    attachments: [
      {
        filename: "file.pdf",
        path: `/home/codebay/data/pdfs/Trip Ticket ${email}.pdf`,
        contentType: "application/pdf"
      }
    ]
  };

  const path="http://www.motoradn.com/wp-content/uploads/2017/10/Como-hacer-fotos-de-motos-en-accci%C3%B3n-MOTORADN-18-1024x640.jpg"
  const qrcode = await generateQR(`Punchase Confirmation of ${email}`);

  const contenido = `
  <div id="pageHeader" style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">
    <img src="https://user-images.githubusercontent.com/2210413/47602244-19fe4f80-da17-11e8-9edf-015b48a6b9c9.png" width="150" height="27" align="left">
    <p style="color: #666; margin: 0; padding-top: 12px; padding-bottom: 5px; text-align: right; font-family: sans-serif; font-size: .85em">
      Canary Xperience
    </p>
    <h1> Punchase confirmation</h1>  
    <img style="heigth:120px; width:120px;" src="${path}">Aqui va la imagen xD</img>
    ${qrcode}
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
    .toFile(`/home/codebay/data/pdfs/Trip Ticket ${email}.pdf`, (err, res) => {
      if (err) console.log(err);
      else {
        // transport.sendMail(mailOptions, (error, info) => {
        //   if (!error)
        //        console.log("Email sent: ", info.response);
        //   else
        //     console.log("Errooooor", error);
        //});
        console.log("pa alante");
      }
    });
};
