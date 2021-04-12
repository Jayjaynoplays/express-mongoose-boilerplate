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
            middlewares: [UserValidator.validateQuery()],
            controller: UserController.findAll
        },
        {
            route: '/:id',
            method: 'get',
            middlewares: [UserValidator.validateParam()],
            controller: UserController.findOne,
        },
        {
            route: '/',
            method: 'post',
            middlewares: [UserValidator.validatePost()],
            controller: UserController.createOne
        },
        {
            route: '/:id',
            method: 'patch',
            middlewares: [
              UserValidator.validateParam(),
              UserValidator.validatePatch(),
            ],
            controller: UserController.patchOne
        },
        {
            route: '/:id',
            method: 'delete',
            middlewares: [UserValidator.validateParam()],
            controller: UserController.deleteOne,
        }
    ]);
