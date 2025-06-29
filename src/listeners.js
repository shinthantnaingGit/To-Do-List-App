import { addTaskHandler, deleteAllHandler, doneAllHandler, listGroupHandler, taskInputHandler, toggleDarkMode, unDoneAllHandler } from "./handlers.js";
import { addBtn, darkModeToggle, deleteAll, doneAll, listGroup, taskInput, unDoneAll } from "./selectors.js";

//EVENT LISTENERS
const listener = () => {
  addBtn.addEventListener("click", addTaskHandler);
  listGroup.addEventListener("click", listGroupHandler);
  taskInput.addEventListener("keyup", taskInputHandler);
  deleteAll.addEventListener("click", deleteAllHandler);
  doneAll.addEventListener("click", doneAllHandler);
  unDoneAll.addEventListener("click", unDoneAllHandler);
  darkModeToggle.addEventListener("click", toggleDarkMode);
};

export default listener;