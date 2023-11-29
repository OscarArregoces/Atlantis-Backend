import { ObjectId } from "mongoose";

export interface Category {
    name: string;
}

export interface SubCategory {
    name: string,
    category: ObjectId
}