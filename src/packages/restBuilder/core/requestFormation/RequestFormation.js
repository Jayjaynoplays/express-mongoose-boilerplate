import { LockValidator } from '../../modules/validator/lock.validator';
import { PaginationFactory } from '../../modules/factory/pagination.factory';
import { SortFactory } from '../../modules/factory/sort.factory';
import { FilterFactory } from '../../modules/factory/filter.factory';
import { SearchFactory } from '../../modules/factory/search.factory';

export class RequestFormation {
    content;

    static paginationFactory = new PaginationFactory();

    static sortFactory = new SortFactory();

    static filterFactory = new FilterFactory();

    static searchFactory = new SearchFactory();

    /**
     * @notes: Validator work when constructor run
     */
    static constructValidator(content, locks) {
        LockValidator.builder()
            .applySortContext(content.sorts)
            .applyFilterContext(content.filters)
            .validate(locks);
    }

    constructor(req, relationSchema) {
        this.content = {};
        this.content.pagination = RequestFormation.paginationFactory.produce(req);
        this.content.filters = RequestFormation.filterFactory.produce(req);
        this.content.sorts = RequestFormation.sortFactory.produce(req);
        this.content.search = RequestFormation.searchFactory.produce(req);
        this.content.main = relationSchema?.main;
        this.content.associates = relationSchema?.associates;
        RequestFormation.constructValidator(this.content, relationSchema?.locks);
    }

    setPage(page) {
        this.content.pagination.page = page;
        return this;
    }

    setSize(size) {
        this.content.pagination.size = size;
        return this;
    }

    clearPage() {
        this.content.pagination.page = null;
        return this;
    }

    clearSize() {
        this.content.pagination.size = null;
        return this;
    }

    addSort(input) {
        this.content.sorts.push(
            RequestFormation.sortFactory.produce(input)[0]
        );
        return this;
    }

    addFilter(input) {
        this.content.filters.push(
            RequestFormation.filterFactory.produce(input)[0]
        );
        return this;
    }

    addSearch(input) {
        this.content.search = input;
        return this;
    }

    translate() {
        return this.content;
    }
}
