import { Module } from '../../../../packages/handler/Module';
import { UserController } from '../controller/user.controller';
import { UserValidator } from '../../../modules/user/validator/user.validator';

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
            controller: UserController.findAll
        },
        {
            route: '/',
            method: 'post',
            middlewares: [UserValidator.createValidation()],
            controller: UserController.createOne
        }
    ]);
