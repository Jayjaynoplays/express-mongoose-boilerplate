import { SwaggerDocument } from './document';

export class SwaggerContentCreator {
    #rawContent;

    #prefixRoute;

    static builder() {
        return new SwaggerContentCreator();
    }

    #toRouteSwagger = () => {
        const fullRoute = this.#prefixRoute.prefixPath === '/'
            ? this.#rawContent.route
            : `${this.#prefixRoute.prefixPath}${this.#rawContent.route}`;

        return fullRoute
            .split('/')
            .map(el => {
                if (el.startsWith(':')) {
                    return `${el.replace(':', '{')}}`;
                }
                return el;
            })
            .join('/');
    }

    #toParams = params => {
        const autoGenParams = SwaggerDocument.ApiParams(this.#rawContent.route);

        if (!params || params.length === 0) {
            return [];
        }

        return [...params, ...autoGenParams];
    }

    fromJson(rawContent) {
        this.#rawContent = rawContent;
        return this;
    }

    addPrefix(prefix) {
        this.#prefixRoute = prefix;
        return this;
    }

    build() {
        this.#rawContent.route = this.#toRouteSwagger();
        this.#rawContent.params = this.#toParams();
        this.#rawContent.tags = [this.#prefixRoute.tag];
        return this.#rawContent;
    }
}
