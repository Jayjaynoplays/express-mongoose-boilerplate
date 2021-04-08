import { Schema } from 'mongoose';
import { DatabaseInstance } from '../../../config/database';

export const UserModel = DatabaseInstance
    .buildModel('user', {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, 'User email is empty'],
        },
        password: {
            type: String,
            trim: true,
            required: [true, 'User password is empty'],
        },
        roles: [{ type: Schema.Types.ObjectId, ref: 'role' }]
    });
