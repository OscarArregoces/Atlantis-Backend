import { Schema, model } from "mongoose";

const RoleSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
)

const RoleModel = model('role', RoleSchema);

export default RoleModel;