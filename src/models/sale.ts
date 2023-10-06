import { Schema, Types, model } from "mongoose";

const SaleSchema = new Schema(
    {
        client_name: {
            type: String,
            require: true
        },
        client_phone: {
            type: String,
            require: true
        },
        products: [
            {
                product: {
                    type: Types.ObjectId,
                    ref: 'product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const SaleModel = model('sale', SaleSchema);
export { SaleModel };