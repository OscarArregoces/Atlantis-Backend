import { Schema, model } from "mongoose";

const SupplierSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const SupplierModel = model('supplier', SupplierSchema);
export { SupplierModel };