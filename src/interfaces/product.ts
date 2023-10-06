import { ObjectId } from "mongoose";
import { Category } from "./category";

export interface Product {
    name: string;
    quantity: number;
    total_price: number;
    unit_price: number;
    unit_cost: number;
    supplier: string;
    img_url: string;
    category: ObjectId | Category
    // category?: ObjectId | Category
}