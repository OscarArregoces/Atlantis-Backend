import { Schema, Types, model, Model } from "mongoose";
import { User } from "../interfaces/user.interface";


const UserSchema = new Schema<User>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        roles: [{
            ref: 'role',
            type: Types.ObjectId
        }],
        person: {
            type: Types.ObjectId,
            ref: 'person',
        }
    }
    , {
        timestamps: true,
        versionKey: false,
    }
)

const UserModel = model('user', UserSchema);

export default UserModel;