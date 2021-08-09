class Event {
    constructor() {
        this.listeners = [];
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    trigger(...args) {
        this.listeners.forEach((cb) => cb(...args));
    }
}

export default Event;
