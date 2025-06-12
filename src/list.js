import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
//ACTIONS (BUSINESS LOGICS)
//CREATE LIST
export const tasks = [
  "Shin Thant Naing",
  "❤️❤️❤️",
  "May Thu San Naing",
];
// let listCounter = 0;
export const createList = (task) => {
  const listTP = listTemplate.content.cloneNode(true);
  //   console.log(listTP);
  const list = listTP.querySelector(".list");
  list.id = "list" + uuidv4();
  // list.id = "list" + listCounter++;
  listTP.querySelector(".list-task").innerText = task;

  //WHEN ADD NEW TASK SHOW DONE ALL BUTTON
  const allLists = listGroup.querySelectorAll(`.list `);
  const checkedLists = listGroup.querySelectorAll(`.list input:checked`);
  console.log("lists", allLists.length);
  console.log("checked", checkedLists.length);
  if (allLists.length === checkedLists.length) {
    doneAll.classList.remove("hidden");
    unDoneAll.classList.add("hidden");
  }
  //MAKE DELETE BUTTON SEE
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
        // updateTaskTotal();
        // updateDoneTotal();
        const allLists = listGroup.querySelectorAll(`.list `);
        if (allLists.length === 0) {
          deleteAll.classList.add("opacity-50");
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
  editTaskInput.className = "font-mono text-xl font-bold w-[180px]";
  task.classList.add("hidden");
  editTaskInput.value = task.innerText;
  task.after(editTaskInput);
  editTaskInput.focus();
  editTaskInput.className =
    "border-2 border-stone-950 font-semibold font-mono ps-2 py-1 w-[180px] focus-visible:outline-none";
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
  if (allLists.length === checkedLists.length) {
    doneAll.classList.add("hidden");
    unDoneAll.classList.remove("hidden");
  } else {
    doneAll.classList.remove("hidden");
    unDoneAll.classList.add("hidden");
  }
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
  // updateDoneTotal();
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
