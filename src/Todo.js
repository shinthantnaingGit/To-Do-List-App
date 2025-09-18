import initialRender from "./initialRender.js";
import listener from "./listeners.js";
import observer from "./obserber.js";
import { initLanguageSystem } from "./handlers.js";

class Todo {
  init() {
    console.log("todo start");
    initLanguageSystem();
    observer();
    initialRender();
    listener();
  }
}

export default Todo;
