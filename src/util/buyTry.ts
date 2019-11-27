import nodemailer from 'nodemailer';
import { mongoTrip } from '../types/trip';
import createError from 'http-errors';


export const handleParticipants = async (numberOfPersons: Number, trip: mongoTrip) => {
  if (trip != null) {
    const people: number = numberOfPersons.valueOf() + trip.participants.valueOf();
    if (people <= trip.totalPersons.valueOf()) {
      trip.participants = people;
      await trip.save();
      return true;
    }
    else
      throw createError(403, "Trip has to much people");
  }
  else
    throw createError(411, "Trip id was wrong");
}

export const sendMail = (email: String) => {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nodemail212221212@gmail.com',
      pass: ''
    }
  })

  const mailOptions = {
    from: 'nodemail212221212@gmail.com',
    to: email.toString(),
    subject: 'Purchase Confirmation',
    text: `This email was generated automatically. Please, do not answer this email.
If you have any question, contact with the company that proposed the trip.
We are at your entire disposal in case you need some further information.

Canary Xperience Team`,
    attachments: [{
      filename: 'file.pdf',
      path: '/home/sergio/Dropbox/a.pdf',
      contentType: 'application/pdf'
    }]
  }
  transport.sendMail(mailOptions, (error, info) => {
    if (!error)
      console.log('Email sent: ', info.response);
    else {
      console.log("Erooooor");
    }
  })
}

