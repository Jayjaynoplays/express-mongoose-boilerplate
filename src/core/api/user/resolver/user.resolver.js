import { Module } from '../../../../packages/handler/Module';
import { UserController } from '../controller/user.controller';

export const UserResolver = Module.builder()
    .addPrefix({
        prefixPath: '/users',
        tag: 'users',
        module: 'UserModule'
    })
    .register([
        {
            route: '/',
            method: 'get',
            controller: UserController.test
        }
    ]);
