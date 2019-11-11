import mongoose, { Schema, Document } from 'mongoose';

export interface User {
    email: string,
    nickname: string,
    password: string,
    businnes: boolean,
    logo: string,
    description: string
};

export interface mongoUser extends Document {
    email: string,
    nickname: string,
    password: string,
    businnes: boolean,
    logo: string,
    description: String
}

