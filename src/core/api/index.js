import { HandlerResolver } from '../../packages/handler/HandlerResolver';
import { UserResolver } from './user/resolver/user.resolver';

export const ModuleResolver = HandlerResolver
    .builder()
    .addModule([UserResolver])
    .resolve();
