class Events {
  constructor() {
    this.listeners = new Set();
  }

  listen(name, callback) {
    this.listeners.add({
      name,
      callback
    });
  }

  emit(name, ...data) {
    this.listeners.forEach(listener => {
      if (listener.name === name) {
        listener.callback(...data);
      }
    });
  }
}

export default Events;
