import { Schema } from 'mongoose';
import { DatabaseInstance } from '../../../config/database';

export const RoleModel = DatabaseInstance
    .buildModel('role', {
        name: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, 'Role name is empty'],
        },
        permissions: [{ type: Schema.Types.ObjectId, ref: 'permissions' }]
    });
