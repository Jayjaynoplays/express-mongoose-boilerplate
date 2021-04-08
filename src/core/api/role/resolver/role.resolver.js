import { Module } from '../../../../packages/handler/Module';
import { RoleController } from '../controller/role.controller';
import { RoleValidator } from '../../../modules/role/validator/role.validator';

export const RoleResolver = Module.builder()
    .addPrefix({
        prefixPath: '/roles',
        tag: 'roles',
        module: 'RoleModule'
    })
    .register([
        {
            route: '/',
            method: 'get',
            controller: RoleController.findAll
        },
        {
            route: '/:id',
            method: 'get',
            controller: RoleController.findOne
        },
        {
            route: '/',
            method: 'post',
            middlewares: [RoleValidator.createValidation()],
            controller: RoleController.createOne
        },
        {
          route: '/:id',
          method: 'patch',
          controller: RoleController.patchOne
        },
        {
            route: '/:id',
            method: 'delete',
            controller: RoleController.deleteOne,
        }
    ]);
