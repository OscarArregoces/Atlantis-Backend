import { Schema, model } from "mongoose";

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
);

const SubCategoryModel = model('subcategory', SubCategorySchema);
export { SubCategoryModel };