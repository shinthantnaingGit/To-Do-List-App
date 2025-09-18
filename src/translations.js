// Language translations
export const translations = {
  en: {
    title: "Your To-Do List",
    taskPlaceholder: "Add a new task...",
    addTask: "Add Task",
    totalTasks: "Total Tasks:",
    completed: "Completed:",
    clearAll: "Clear All",
    markAll: "Mark All",
    unmarkAll: "Unmark All",
    // SweetAlert messages
    oops: "Oops...",
    needTask: "You need to create a task!",
    gotIt: "Got it",
    noTasksToRemove: "No tasks to remove",
    listEmpty: "Your list is already empty!",
    ok: "OK",
    areYouSure: "Are you sure?",
    wontRevert: "You won't be able to revert this! All tasks will be deleted.",
    yesDeleteAll: "Yes, delete them all!",
    noKeepThem: "No, keep them",
    allDeleted: "All Deleted!",
    listCleared: "Your entire list has been cleared.",
    noTasksToMark: "No tasks to mark",
    noTasksToMarkComplete: "There are no tasks to mark as complete.",
    deleteFile: "You won't be able to revert this!",
    yesDeleteIt: "Yes, delete it!",
    noKeepIt: "No, keep it",
    deleted: "Deleted!",
    fileDeleted: "Your file has been deleted.",
    // Empty state
    emptyTitle: "No tasks yet",
    emptyDescription: "Add your first task above to get started!",
  },
  jp: {
    title: "あなたのTo-Doリスト",
    taskPlaceholder: "新しいタスクを追加...",
    addTask: "タスク追加",
    totalTasks: "総タスク数:",
    completed: "完了:",
    clearAll: "すべて削除",
    markAll: "すべて完了",
    unmarkAll: "すべて未完了",
    // SweetAlert messages
    oops: "おっと...",
    needTask: "タスクを作成する必要があります！",
    gotIt: "了解",
    noTasksToRemove: "削除するタスクがありません",
    listEmpty: "リストは既に空です！",
    ok: "OK",
    areYouSure: "本当によろしいですか？",
    wontRevert: "この操作は元に戻せません！すべてのタスクが削除されます。",
    yesDeleteAll: "はい、すべて削除します！",
    noKeepThem: "いいえ、保持します",
    allDeleted: "すべて削除されました！",
    listCleared: "リストがすべてクリアされました。",
    noTasksToMark: "マークするタスクがありません",
    noTasksToMarkComplete: "完了としてマークするタスクがありません。",
    deleteFile: "この操作は元に戻せません！",
    yesDeleteIt: "はい、削除します！",
    noKeepIt: "いいえ、保持します",
    deleted: "削除されました！",
    fileDeleted: "ファイルが削除されました。",
    // Empty state
    emptyTitle: "タスクがありません",
    emptyDescription: "上の入力欄から最初のタスクを追加してください！",
  },
};

// Current language state
let currentLanguage = "jp";

// Get current language
export const getCurrentLanguage = () => currentLanguage;

// Set current language
export const setCurrentLanguage = (lang) => {
  currentLanguage = lang;
  localStorage.setItem("language", lang);
};

// Get translation for current language
export const t = (key) => {
  return translations[currentLanguage][key] || translations.en[key] || key;
};

// Initialize language from localStorage
export const initLanguage = () => {
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage && translations[savedLanguage]) {
    currentLanguage = savedLanguage;
  } else {
    currentLanguage = "jp";
    localStorage.setItem("language", "jp");
  }
};
