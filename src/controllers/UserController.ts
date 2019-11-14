import { sign } from "jsonwebtoken";
import { User } from '../types/user';
import { Request, Response } from "express";
import createError from 'http-errors';


export const login = async (req: Request, res: Response, userRepository: any) => {
    const { email, password } = req.body;
    const isValid: boolean = await userRepository.checkPassw(email, password);
    if (isValid) {
        let token = sign({ id: email }, "supersecret", {
            expiresIn: "12h"
        });
        return res.status(200).send(token);
    }
    else
        throw createError(411, "Login was wrong");
}

export const signup = async (user: User, userRepository: any) => {
    return await userRepository.createUser(user);
};

