import async from "async";
import crypto from "crypto";
import { User } from '../types/user';

import { Request, Response } from "express";

import * as userRepository from '../repositories/UserRepository';


export const login = async (req: Request, res: Response) => {
    console.log(req);
    return res.status(200).send("logueadooo");
}

export const signup = async (req: Request, res: Response) => {
    console.log(req.body);
    await userRepository.createUser(req.body);
    return res.status(200).send("singupeado bbsitaa");
};