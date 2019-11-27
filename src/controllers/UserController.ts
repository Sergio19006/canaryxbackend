import { sign } from "jsonwebtoken";
import { User } from '../types/user';
import createError from 'http-errors';
import { mongoTrip } from "trip";
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

export const signup = async (user: User, userRepository: any) => {
    return await userRepository.createUser(user);
};


export const buyTrip = async (email: String, _id: String, numberOfPersons: Number, userRepository: any, tripRepository: any) => {
    const trip: mongoTrip = await tripRepository.tripById(_id);
    if (handleParticipants(numberOfPersons, trip)) {
        sendMail(email);
    }
    return "";
};



