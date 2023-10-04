import { Types } from "mongoose";
import { Auth } from "./auth.interface";
import { Person } from "./person.interface";

export interface User extends Auth {
    roles: any;
    person: Person;
    // person: Person | Types.ObjectId;
}