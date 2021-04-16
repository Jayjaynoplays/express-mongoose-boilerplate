export class ConfigPublisher {
    context = null;

    listListener = [];

    addListener(listener) {
        this.listListener.push(listener);
        return this;
    }

    config(config) {
        this.context = config;
        this.publish();
        return this;
    }

    publish() {
        this.listListener.forEach(item => {
            item.receive(this.context);
        });
        return this;
    }
}
