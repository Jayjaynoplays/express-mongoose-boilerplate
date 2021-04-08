import { DatabaseInstance } from '../../../config/database';

export const PermissionModel = DatabaseInstance
    .buildModel('permission', {
        name: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, 'Permission name is empty'],
        },
    });
