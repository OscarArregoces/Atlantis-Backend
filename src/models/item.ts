import { Schema, Types, model, Model } from "mongoose";
import { Car } from "../interfaces/car.interface";



const ItemSchema = new Schema<Car>(
    {
        color: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
    }
    , {
        timestamps: true,
        versionKey: false,
    }
)

const ItemModel = model('item', ItemSchema);

export default ItemModel;