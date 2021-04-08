import { Schema } from 'mongoose';
import { DatabaseInstance } from '../../../config/database';

export const UserModel = DatabaseInstance
    .buildModel('user', {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        roles: [{ type: Schema.Types.ObjectId, ref: 'role' }]
    });
