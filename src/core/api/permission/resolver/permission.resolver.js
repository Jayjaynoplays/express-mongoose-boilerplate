import { Module } from '../../../../packages/handler/Module';
import { PermissionController } from '../controller/permission.controller';
import { PermissionValidator } from '../../../modules/permission/validator/permission.validator';

export const PermissionResolver = Module.builder()
    .addPrefix({
        prefixPath: '/permissions',
        tag: 'permissions',
        module: 'PermissionModule'
    })
    .register([
        {
            route: '/',
            method: 'get',
            controller: PermissionController.findAll
        },
        {
            route: '/',
            method: 'post',
            middlewares: [PermissionValidator.createValidation()],
            controller: PermissionController.createOne
        },
        {
          route: '/:id',
          method: 'patch',
          controller: PermissionController.patchOne
        },
        {
            route: '/:id',
            method: 'delete',
            controller: PermissionController.deleteOne,
        }
    ]);
