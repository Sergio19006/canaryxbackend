import { sign } from "jsonwebtoken";
import { User } from '../types/user';
import createError from 'http-errors';
import { mongoTrip, File } from "trip";
import { mongoUser } from "user";
import { sendMail, handleParticipants } from '../util/buyTry';


export const login = async (email: String, password: String, userRepository: any) => {
    const isValid: boolean = await userRepository.checkPassw(email, password);
    if (isValid) {
        let token = sign({ id: email }, "supersecret", {
            expiresIn: "12h"
        });
        return token;
    }
    else
        throw createError(411, "Login was wrong");
}

export const signup = async (user: User, imgObject: File, userRepository: any) => {
    if (imgObject != undefined) {
        const img = imgObject['img'];
        user.logo = `${process.env.PHOTO_SERVICE}users/${img.name}`;
    };

    return await userRepository.createUser(user);
};


export const buyTrip = async (email: String, _id: String, numberOfPersons: Number, userRepository: any, tripRepository: any) => {
    const trip: mongoTrip = await tripRepository.tripById(_id);
    if (trip != null) {
        if (handleParticipants(numberOfPersons, trip)) {
            sendMail(email);
        }
    }

    return "Check your email for the pdf with your entri trip.";
};

export const findUser = async (email: String, tripRepository: any) => {
    const user: mongoUser = await tripRepository.findUser(email);
    if (user == null) {
        createError(411, "user not found");
        return;
    }
    return user;
};



