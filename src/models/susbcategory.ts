import { Schema, Types, model } from "mongoose";

const SubCategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            ref: 'category',
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const SubCategoryModel = model('subcategory', SubCategorySchema);
export { SubCategoryModel };