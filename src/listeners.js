import {
  addTaskHandler,
  deleteAllHandler,
  doneAllHandler,
  listGroupHandler,
  taskInputHandler,
  toggleLanguage,
  unDoneAllHandler,
} from "./handlers.js";
import {
  addBtn,
  languageToggle,
  deleteAll,
  doneAll,
  listGroup,
  taskInput,
  unDoneAll,
} from "./selectors.js";

//EVENT LISTENERS
const listener = () => {
  addBtn.addEventListener("click", addTaskHandler);
  listGroup.addEventListener("click", listGroupHandler);
  taskInput.addEventListener("keyup", taskInputHandler);
  deleteAll.addEventListener("click", deleteAllHandler);
  doneAll.addEventListener("click", doneAllHandler);
  unDoneAll.addEventListener("click", unDoneAllHandler);
  languageToggle.addEventListener("click", toggleLanguage);
};

export default listener;
