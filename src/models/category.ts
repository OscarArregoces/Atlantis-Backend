import { Schema, model } from "mongoose";



const CategorySchema = new Schema(
    {
        name: {
            type: String,
            unique: true
        }
        // ,
        // subCategory: [
        //     {
        //         ref: 'subcategory',
        //         type: Schema.Types.ObjectId,
        //         default: []
        //     }
        // ]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const CategoryModel = model('category', CategorySchema);

export { CategoryModel };