import { ObjectId } from "mongoose";

export interface Person {
    _id?: ObjectId
    name?: string;
    surname?: string;
    birthday?: string;
    type_document?: 'Cedula Ciudadania' | 'Tarjeta identidad' | 'NIT' | 'Pasaporte';
    no_document?: string;
    country?: string;
    city?: string;
    phone?: string;
}