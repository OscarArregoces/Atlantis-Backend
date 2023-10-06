import { ObjectId } from "mongoose";
import { Product } from "./product";

export interface Sale {
    client_name: string;
    client_phone: string;
    products: [{
        product: ObjectId | Product;
        quantity: number;
    }];
};