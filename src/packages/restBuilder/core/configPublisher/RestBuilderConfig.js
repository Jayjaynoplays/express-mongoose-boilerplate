import { ConfigPublisher } from './ConfigPublisher';
import { PaginationFactory } from '../../modules/factory/pagination.factory';

export const RestBuilderConfig = new ConfigPublisher()
    .addListener(PaginationFactory);
