import { Schema, Types, model } from "mongoose";

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        reference:{
            type: String,
            require: true
        },
        brand: {
            type: String,
            require: true
        },
        quantity: {
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
        img_url: {
            type: String,
            require: true
        },
        subcategory: {
            type: Schema.Types.ObjectId,
            ref: 'subcategory'
        },
        supplier: {
            type: Schema.Types.ObjectId,
            ref: 'supplier'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ProductModel = model('product', ProductSchema);
export { ProductModel };