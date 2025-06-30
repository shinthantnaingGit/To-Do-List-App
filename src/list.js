import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { doneAll } from "./selectors";
//ACTIONS (BUSINESS LOGICS)
//CREATE LIST
export const tasks = [
  "Small steps, big results.🚀",
  "Keep moving forward.➡️",
  "You’ve got this!💪",
];
// let listCounter = 0;
export const createList = (task) => {
  const listTP = listTemplate.content.cloneNode(true);
  //   console.log(listTP);
  const list = listTP.querySelector(".list");
  list.id = "list" + uuidv4();
  // list.id = "list" + listCounter++;
  listTP.querySelector(".list-task").innerText = task;
  //SHOW DONE ALL BUTTON DELETE ALL BUTTON
  doneAll.classList.remove("hidden");
  doneAll.classList.remove("opacity-50");
  unDoneAll.classList.add("hidden");
  deleteAll.classList.remove("opacity-50");
  return list;
};
//DELETE LIST
export const deleteList = (listId) => {
  const currentList = document.querySelector(`#${listId}`);
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, keep it",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      currentList.classList.add("animate__animated", "animate__zoomOut");
      currentList.addEventListener("animationend", () => {
        currentList.remove();
        const allLists = listGroup.querySelectorAll(`.list `);
        const checkedLists = listGroup.querySelectorAll(`.list input:checked`);
        if (allLists.length === 0) {
          deleteAll.classList.add("opacity-50");
          doneAll.classList.add("opacity-50");
          doneAll.classList.remove("hidden");
          unDoneAll.classList.add("hidden");
        } else if (
          allLists.length === checkedLists.length &&
          allLists.length > 0
        ) {
          doneAll.classList.add("hidden");
          unDoneAll.classList.remove("hidden");
        }
      });
    }
  });
};
//EDIT LIST
export const editList = (listId) => {
  const currentList = document.querySelector(`#${listId}`);
  const editBtn = currentList.querySelector(".edit-btn");
  const task = currentList.querySelector(".list-task");
  const editTaskInput = document.createElement("input");
  editTaskInput.className =
    "flex-grow text-lg font-semibold border-2 border-purple-400 focus-visible:outline-none rounded-md px-2 py-1 mr-4";
  task.classList.add("hidden");
  editTaskInput.value = task.innerText;
  task.after(editTaskInput);
  editTaskInput.focus();
  editBtn.setAttribute("disabled", "true");
  //Blur Event For Edit Input
  editTaskInput.addEventListener("blur", () => {
    task.innerText = editTaskInput.value;
    editTaskInput.classList.add("hidden");
    task.classList.remove("hidden");
    editBtn.removeAttribute("disabled", "true");
  });
  //Enter Event for Edit Input
  editTaskInput.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
      task.innerText = editTaskInput.value;
      editTaskInput.classList.add("hidden");
      task.classList.remove("hidden");
      editBtn.removeAttribute("disabled", "true");
    }
  });
};
//CHECK LIST
export const checkList = (listId) => {
  const currentList = document.querySelector(`#${listId}`);
  const listCheck = currentList.querySelector(".check-list");
  const task = currentList.querySelector(".list-task");
  const editBtn = currentList.querySelector(".edit-btn");
  const allLists = listGroup.querySelectorAll(`.list `);
  const checkedLists = listGroup.querySelectorAll(`.list input:checked`);
  // Update done/undone all buttons based on current state

  if (listCheck.checked) {
    editBtn.setAttribute("disabled", "true");
    currentList.classList.add("scale-90");
    currentList.classList.add("opacity-50");
    currentList.classList.add("duration-200");
    task.classList.add("line-through");
  } else {
    editBtn.removeAttribute("disabled", "true");
    currentList.classList.remove("scale-90");
    currentList.classList.remove("opacity-50");
    task.classList.remove("line-through");
  }
  if (allLists.length === 0) {
    deleteAll.classList.add("opacity-50");
    doneAll.classList.add("opacity-50");
    doneAll.classList.remove("hidden");
    unDoneAll.classList.add("hidden");
  } else if (allLists.length === checkedLists.length && allLists.length > 0) {
    doneAll.classList.add("hidden");
    unDoneAll.classList.remove("hidden");
  } else {
    doneAll.classList.remove("hidden");
    unDoneAll.classList.add("hidden");
  }
};
//UPDATE TASK TOTAL
export const updateTaskTotal = () => {
  const lists = document.querySelectorAll(".list");
  taskTotal.innerText = lists.length;
};
//UPDATE DONE TOTAL
export const updateDoneTotal = () => {
  const listCheck = document.querySelectorAll(".list input:checked");
  doneTotal.innerText = listCheck.length;
};
