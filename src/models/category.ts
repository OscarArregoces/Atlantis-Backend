import { Schema, model } from "mongoose";



const CategorySchema = new Schema(
    {
        name: {
            type: String,
            unique: true
        },
        visibility:{
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const CategoryModel = model('category', CategorySchema);

export { CategoryModel };