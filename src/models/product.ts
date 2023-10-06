import { Schema, Types, model } from "mongoose";

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        quantity: {
            type: Number,
            require: true
        },
        total_price: {
            type: Number,
            require: true
        },
        unit_price: {
            type: Number,
            require: true
        },
        unit_cost: {
            type: Number,
            require: true
        },
        supplier: {
            type: String,
            require: true
        },
        img_url: {
            type: String,
            require: true
        },
        category: {
            type: Types.ObjectId,
            ref: 'category'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ProductModel = model('product', ProductSchema);
export { ProductModel };