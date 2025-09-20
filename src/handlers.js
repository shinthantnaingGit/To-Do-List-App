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
  taskInput,
  deleteAll,
  unDoneAll,
} from "./selectors.js";

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
      title: "おっと...",
      text: "タスクを作成する必要があります！",
      confirmButtonText: "了解",
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
        title: "おっと...",
        text: "タスクを作成する必要があります！",
        confirmButtonText: "了解",
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
      title: "削除するタスクがありません",
      text: "リストは既に空です！",
      confirmButtonText: "OK",
    });
  } else {
    // UPGRADE: Replaced native confirm() with SweetAlert2 for better UX
    Swal.fire({
      title: "本当によろしいですか？",
      text: "この操作は元に戻せません！すべてのタスクが削除されます。",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "はい、すべて削除します！",
      cancelButtonText: "いいえ、保持します",
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
          title: "すべて削除されました！",
          text: "リストがすべてクリアされました。",
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
      title: "マークするタスクがありません",
      text: "完了としてマークするタスクがありません。",
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
