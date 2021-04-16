export class PageableMetaImpl {
    currentPage;

    currentSize;

    totalPage;

    totalRecord;

    static builder() {
        return new PageableMetaImpl();
    }

    appendQueryContainer(query) {
        const queryContent = query.translate();
        this.currentPage = queryContent.pagination.page;
        this.currentSize = queryContent.pagination.size;
        return this;
    }

    appendTotalRecord(total) {
        this.totalRecord = total;
        return this;
    }

    build() {
        return {
            currentPage: this.currentPage,
            currentSize: this.currentSize,
            totalPage: Math.floor(this.totalRecord / this.currentSize) + 1,
            totalRecord: this.totalRecord
        };
    }
}
