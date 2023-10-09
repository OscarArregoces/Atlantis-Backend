import { ObjectId } from "mongoose";

export interface Person {
    _id?: ObjectId
    name?: string;
    surname?: string;
    birthday?: string;
    // type_document?: 'Cedula Ciudadania' | 'Tarjeta identidad' | 'NIT' | 'Pasaporte';
    type_document?: string;
    no_document?: string;
    country?: string;
    city?: string;
    phone?: string;
    img_url?: string;
}
export interface Member {
    email: string;
    password: string;
    name?: string;
    surname?: string;
    birthday?: string;
    type_document?: string;
    no_document?: string;
    country?: string;
    city?: string;
    phone?: string;
    img_url?: string;
    // type_document?: 'Cedula Ciudadania' | 'Tarjeta identidad' | 'NIT' | 'Pasaporte';
}