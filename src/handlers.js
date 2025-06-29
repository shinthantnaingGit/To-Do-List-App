//APPLICATION LOGIC
//HANDLERS

import Swal from "sweetalert2";
import { checkList, createList, deleteList, editList } from "./list.js";
import { listGroup } from "./selectors.js";

//ADD LIST HANDLER
export const addList = (text) => {
  listGroup.append(createList(text));
  taskInput.value = null;
};
//LIST GROUP HANDLER
export const listGroupHandler = (event) => {
  // console.log(event.target);
  const list = event.target.closest(".list");
  // DELETE
  if (event.target.classList.contains("delete-btn")) {
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
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "You need to create a task!",
      confirmButtonText: "Got it",
    });
  }
};
//TASK INPUT HANDLER
export const taskInputHandler = (event) => {
  if (event.key == "Enter") {
    if (taskInput.value.trim()) {
      addList(taskInput.value);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "You need to create a task!",
        confirmButtonText: "Got it",
      });
    }
  }
};
//DELETE ALL LIST HANDLER
export const deleteAllHandler = () => {
  const allLists = listGroup.querySelectorAll(".list");
  if (allLists.length == 0) {
    Swal.fire({
      icon: "info",
      title: "No tasks to remove",
      text: "Your list is already empty!",
      confirmButtonText: "OK",
    });
  } else {
    // UPGRADE: Replaced native confirm() with SweetAlert2 for better UX
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! All tasks will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete them all!",
      cancelButtonText: "No, keep them",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAll.classList.add("opacity-50");

        // Animate and remove each list item
        allLists.forEach((list) => {
          list.classList.add("animate__animated", "animate__fadeOut");
          list.addEventListener("animationend", () => {
            list.remove();
          });
        });
        // Hide doneAll and show unDoneAll (though after deleting all, both might be hidden initially by observer)

        Swal.fire({
          title: "All Deleted!",
          text: "Your entire list has been cleared.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        doneAll.classList.remove("hidden");
        unDoneAll.classList.add("hidden");
      } else {
        deleteAll.classList.remove("opacity-50");
      }
    });
  }
};
//DONE ALL HANDLER
export const doneAllHandler = () => {
  const allLists = listGroup.querySelectorAll(`.list `);
  if (allLists.length === 0) {
    Swal.fire({
      icon: "info",
      title: "No tasks to mark",
      text: "There are no tasks to mark as complete.",
      confirmButtonText: "OK",
    });
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
//TOGGLE DARK MODE HANDLER
export const toggleDarkMode = () => {
  const htmlElement = document.documentElement;
  const isCurrentlyDark = htmlElement.classList.contains("dark");

  console.log(
    "Toggle button clicked. Current dark mode state (before change):",
    isCurrentlyDark ? "Dark" : "Light"
  );

  if (isCurrentlyDark) {
    // Currently dark, switch to light
    htmlElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    if (moonIcon && sunIcon) {
      moonIcon.classList.remove("hidden"); // Show moon for light mode
      sunIcon.classList.add("hidden"); // Hide sun for light mode
    }
    console.log("Switched to LIGHT mode.");
  } else {
    // Currently light, switch to dark
    htmlElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    if (moonIcon && sunIcon) {
      moonIcon.classList.add("hidden"); // Hide moon for dark mode
      sunIcon.classList.remove("hidden"); // Show sun for dark mode
    }
    console.log("Switched to DARK mode.");
  }
  console.log(
    "HTML has dark class (after change):",
    htmlElement.classList.contains("dark")
  );
};
//APPLY STORED THEME
const applyStoredTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  console.log("Applying stored theme:", storedTheme);
  if (storedTheme === "dark") {
    document.documentElement.classList.add("dark");
    // Ensure icons are correctly set on load
    if (moonIcon && sunIcon) {
      moonIcon.classList.add("hidden");
      sunIcon.classList.remove("hidden");
    }
  } else {
    // Default to light mode (or explicitly set if 'light' was stored or no theme saved)
    document.documentElement.classList.remove("dark");
    if (moonIcon && sunIcon) {
      moonIcon.classList.remove("hidden");
      sunIcon.classList.add("hidden");
    }
  }
  console.log(
    "Initial theme applied. HTML has dark class:",
    document.documentElement.classList.contains("dark")
  );
};
