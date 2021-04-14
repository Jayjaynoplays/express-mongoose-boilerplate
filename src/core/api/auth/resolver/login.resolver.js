import { Module } from '../../../../packages/handler/Module';
import { AuthController } from '../controller/login.controller';
import { UserValidator as AuthValidator } from '../../../modules/user/validator/user.validator';

export const LoginResolver = Module.builder()
    .addPrefix({
        prefixPath: '/login',
        tag: 'login',
        module: 'LoginModule'
    })
    .register([
        {
            route: '/',
            method: 'post',
            middlewares: [AuthValidator.validatePost()],
            controller: AuthController.login
        }
    ]);
