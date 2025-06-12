//APPLICATION LOGIC
//HANDLERS

import { checkList, createList, deleteList, editList, updateDoneTotal, updateTaskTotal } from "./list.js";
import { listGroup } from "./selectors.js";

//ADD LIST HANDLER
export const addList = (text) => {
  //   const task = taskInput.value;
  listGroup.append(createList(text));
  taskInput.value = null;
  // updateTaskTotal();
};

//LIST GROUP HANDLER
export const listGroupHandler = (event) => {
  const list = event.target.closest(".list");
  // DELETE
  if (event.target.classList.contains("delete-btn")) {
    console.log(list.id);
    deleteList(list.id);
  }
  //EDIT
  if (event.target.classList.contains("edit-btn")) {
    editList(list.id);
  }
  //CHECK
  if (event.target.classList.contains("check-list")) {
    checkList(list.id);
  }
};
//ADD TASK HANDLER
export const addTaskHandler = () => {
  // console.log(taskInput.value.trim() ?true:false);
  if (taskInput.value.trim()) {
    addList(taskInput.value);
  } else {
    alert(`You need to create a task`);
  }
};
//TASK INPUT HANDLER
export const taskInputHandler = (event) => {
  //   console.clear();
  //   console.log(event);
  if (event.key == "Enter") {
    if (taskInput.value.trim()) {
      addList(taskInput.value);
    } else {
      alert(`You need to create a task`);
    }
  }
};
//DELETE ALL LIST HANDLER
export const deleteAllHandler = () => {
  const allLists = listGroup.querySelectorAll(".list");
  if (allLists.length == 0) {
    alert("There is no lists to remove");
  } else if (confirm("Are you sure to remove all list? ")) {
    deleteAll.classList.add("opacity-50");
 
      allLists.forEach((list) => {
      list.classList.add("animate__animated", "animate__fadeOut");
      list.addEventListener("animationend", () => {
      list.remove();
      // updateTaskTotal();
      // updateDoneTotal();
      });
    });
    
    doneAll.classList.remove("hidden");
    unDoneAll.classList.add("hidden");
  } else {
    deleteAll.classList.remove("opacity-50");
  }
};
//DONE ALL HANDLER
export const doneAllHandler = () => {
  const allLists = listGroup.querySelectorAll(`.list `);
  if (allLists.length === 0) {
    alert("There is no list to check");
  } else {
    allLists.forEach((list) => {
      const listCheck = list.querySelector(`.check-list`);
      listCheck.checked = true;
      checkList(list.id);
    });
    // doneAll.setAttribute("disabled",true);
    doneAll.classList.add("hidden");
    unDoneAll.classList.remove("hidden");
  }
};
//UNDONE ALL HANDLER
export const unDoneAllHandler = () => {
  const allLists = listGroup.querySelectorAll(".list");
  allLists.forEach((list) => {
    const listCheck = list.querySelector(".check-list");
    listCheck.checked = false;
    checkList(list.id);
  });
  // doneAll.setAttribute("disabled",true);
  doneAll.classList.remove("hidden");
  unDoneAll.classList.add("hidden");
};
