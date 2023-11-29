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
        totalSale: {
            type: Number,
            require: true
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
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