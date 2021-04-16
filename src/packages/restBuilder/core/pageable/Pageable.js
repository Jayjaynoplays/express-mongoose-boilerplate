export class Pageable {
    content;

    meta;

    previous;

    next;

    static of(content) {
        return new Pageable(content);
    }

    constructor(content) {
        this.content = content;
    }

    addMeta(meta) {
        this.meta = meta;
        return this;
    }

    addPreviousLink(link) {
        this.previous = link;
        return this;
    }

    addNextLink(link) {
        this.next = link;
        return this;
    }

    build() {
        return {
            content: this.content,
            meta: this.meta,
            previous: this.previous,
            next: this.next
        };
    }
}
