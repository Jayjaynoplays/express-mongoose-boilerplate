import { FilterFactory } from './FilterFactory';
import { SortFactory } from './SortFactory';

export class FindFactory {
    /** @type {import('knex').QueryBuilder} */
    #builder;

    /** @type {import('../RequestFilter/RequestFormatter').RequestFormatter} */
    #query;

    #relations;

    /** @type {import('./FilterFactory').FilterFactory} */
    #filterFactory;

    /** @type {import('./SortFactory').SortFactory} */
    #sortFactory;

    /**
     *
     * @param {import('knex').QueryBuilder} connection
     * @param {import('../RequestFilter/RequestFormatter').RequestFormatter} query
     */
    constructor(connection, query) {
        this.#query = query;
        this.#builder = connection
            .select('*')
            .limit(query.size)
            .offset((query.page - 1) * query.size);
    }

    getBuilder() {
        this.#filterFactory = new FilterFactory(this.#builder, this.#query.filter);
        this.#filterFactory.buildDefaultFilter();

        this.#sortFactory = new SortFactory(this.#builder, this.#query.filter);
        this.#sortFactory.buildDefaultSort();
        return this;
    }

    execute() {
        return this.#builder;
    }
}
