var SortedArray = require("sorted-array");

export default class EventTarget  {

  constructor() {
    this.listeners = {};
  }

  addEventListener(type, callback, options) {
    if (!(type in this.listeners)) {
      this.listeners[type] = SortedArray.comparing(i => i.priority, []);
    }

    let priority = 100;
    if (options && options.priority) priority = options.priority;

    this.listeners[type].insert({priority, callback});
  }

  removeEventListener(type, callback) {
    if (!(type in this.listeners)) {
      return;
    }

    var stack = this.listeners[type];
    for (var i = 0, l = stack.array.length; i < l; i++) {
      if (stack.array[i].callback === callback){
        stack.remove(stack.array[i]);
        return;
      }
    }
  }

  dispatchEvent(event) {
    if (!(event.type in this.listeners)) {
      return true;
    }

    var stack = this.listeners[event.type];

    for (var i = 0, l = stack.array.length; i < l; i++) {
      stack.array[i].callback.call(this, event);
    }

    return !event.defaultPrevented;
  }
};
