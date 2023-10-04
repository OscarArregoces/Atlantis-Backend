import { Schema, model } from "mongoose";


const PersonSchema = new Schema(
    {
        name: {
            type: String,
        },
        surname: {
            type: String,
        },
        birthday: {
            type: String,
        },
        type_document: {
            type: String,
        },
        no_document: {
            type: String,
            unique: true
        },
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        phone: {
            type: String,
            unique: true
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const PersonModel = model('person', PersonSchema);
export default PersonModel;