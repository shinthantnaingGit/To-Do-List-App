import initialRender from "./initialRender.js";
import listener from "./listeners.js";
import observer from "./obserber.js";

class Todo {
  init() {
    console.log("todo start");
    observer();
    initialRender();
    listener();
  }
}

export default Todo;
