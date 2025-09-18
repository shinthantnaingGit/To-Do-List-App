import { addList } from "./handlers.js";
import { tasks, showEmptyState } from "./list.js";

const initialRender = () => {
  console.log("I am render at app start");
  if (tasks.length === 0) {
    showEmptyState();
  } else {
    tasks.forEach((task) => {
      addList(task);
    });
  }
};

export default initialRender;
