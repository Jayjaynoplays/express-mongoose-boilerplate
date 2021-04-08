import { HandlerResolver } from '../../packages/handler/HandlerResolver';
import { PermissionResolver } from './permission/resolver/permission.resolver';
import { RoleResolver } from './role/resolver/role.resolver';
import { UserResolver } from './user/resolver/user.resolver';

export const ModuleResolver = HandlerResolver
    .builder()
    .addModule([UserResolver, RoleResolver, PermissionResolver])
    .resolve();
