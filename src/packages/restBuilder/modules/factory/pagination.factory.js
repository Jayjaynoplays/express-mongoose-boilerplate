import { logger } from '../../../../core/modules/logger/winston';
import { BadRequestException } from '../../../httpException/BadRequestException';

export class PaginationFactory {
    static logger = logger;

    static DEFAULT_RADIX = 10;

    static MAX_PAGE: number = null;

    static MAX_SIZE: number = null;

    static DEFAULT_PAGE: number = null;

    static DEFAULT_SIZE: number = null;

    constructor() {
        PaginationFactory.logger.log(`${PaginationFactory.name} factory is built`);
    }

    produce(req: any) {
        return this.transform(req);
    }

    transform(input) {
        let parsedPage = Number.parseInt(input.page, PaginationFactory.DEFAULT_RADIX);
        let parsedSize = Number.parseInt(input.size, PaginationFactory.DEFAULT_RADIX);

        if (Number.isNaN(parsedPage)) {
            parsedPage = PaginationFactory.DEFAULT_PAGE;
        } else if (parsedPage > PaginationFactory.MAX_PAGE) {
            throw new BadRequestException('Page reach max');
        }

        if (Number.isNaN(parsedSize)) {
            parsedSize = PaginationFactory.DEFAULT_SIZE;
        } else if (parsedPage > PaginationFactory.MAX_SIZE) {
            throw new BadRequestException('Size reach max');
        }

        return {
            page: parsedPage,
            size: parsedSize
        };
    }

    static receive(obj): void {
        PaginationFactory.MAX_PAGE = obj.MAX_PAGE;
        PaginationFactory.MAX_SIZE = obj.MAX_SIZE;
        PaginationFactory.DEFAULT_PAGE = obj.DEFAULT_PAGE;
        PaginationFactory.DEFAULT_SIZE = obj.DEFAULT_SIZE;
    }
}
