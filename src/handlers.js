//APPLICATION LOGIC
//HANDLERS

import Swal from "sweetalert2";
import {
  checkList,
  createList,
  deleteList,
  editList,
  showEmptyState,
} from "./list.js";
import {
  doneAll,
  listGroup,
  languageText,
  taskInput,
  deleteAll,
  unDoneAll,
} from "./selectors.js";
import {
  t,
  setCurrentLanguage,
  getCurrentLanguage,
  initLanguage,
} from "./translations.js";

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
      title: t("oops"),
      text: t("needTask"),
      confirmButtonText: t("gotIt"),
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
        title: t("oops"),
        text: t("needTask"),
        confirmButtonText: t("gotIt"),
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
      title: t("noTasksToRemove"),
      text: t("listEmpty"),
      confirmButtonText: t("ok"),
    });
  } else {
    // UPGRADE: Replaced native confirm() with SweetAlert2 for better UX
    Swal.fire({
      title: t("areYouSure"),
      text: t("wontRevert"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("yesDeleteAll"),
      cancelButtonText: t("noKeepThem"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAll.classList.add("opacity-50");
        doneAll.classList.add("opacity-50");

        // Animate and remove each list item
        allLists.forEach((list) => {
          list.classList.add("animate__animated", "animate__fadeOut");
          list.addEventListener("animationend", () => {
            list.remove();
          });
        });
        // Hide doneAll and show unDoneAll (though after deleting all, both might be hidden initially by observer)

        Swal.fire({
          title: t("allDeleted"),
          text: t("listCleared"),
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        doneAll.classList.remove("hidden");
        unDoneAll.classList.add("hidden");
        // Show empty state after all tasks are deleted
        setTimeout(() => {
          showEmptyState();
        }, 100);
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
      title: t("noTasksToMark"),
      text: t("noTasksToMarkComplete"),
      confirmButtonText: t("ok"),
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
//TOGGLE LANGUAGE HANDLER
export const toggleLanguage = () => {
  const currentLang = getCurrentLanguage();
  const newLang = currentLang === "en" ? "jp" : "en";

  setCurrentLanguage(newLang);
  updateLanguageDisplay();
  updateAllTexts();

  console.log(`Language switched to: ${newLang}`);
};

//UPDATE LANGUAGE DISPLAY
const updateLanguageDisplay = () => {
  const currentLang = getCurrentLanguage();
  if (languageText) {
    languageText.textContent = currentLang.toUpperCase();
  }
};

//UPDATE ALL TEXTS ON PAGE
const updateAllTexts = () => {
  // Update elements with data-i18n attribute
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = t(key);
  });

  // Update elements with data-i18n-placeholder attribute
  const placeholderElements = document.querySelectorAll(
    "[data-i18n-placeholder]"
  );
  placeholderElements.forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    element.placeholder = t(key);
  });
};

//INITIALIZE LANGUAGE SYSTEM
export const initLanguageSystem = () => {
  initLanguage();
  updateLanguageDisplay();
  updateAllTexts();
};
