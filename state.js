import { loadStorage, saveStorage } from "./storage.js";

// タスクリスト
const state = {
  taskList: [
    {
      id: "1",
      name: "表示させる1",
      status: "active",
      deadline: "2026-03-01",
      editFlg: false,
    },
    {
      id: "2",
      name: "表示させる2",
      status: "done",
      deadline: "2026-03-01",
      editFlg: true,
    },
  ],
  filter: "all",
};

// セッター（ローカルストレージからロードしてセット、フィルタ条件指定）
export function setTaskList(list) {
  state.taskList = list;
}
// ゲッター（state内容を渡してあげる）
export function getTaskList() {
  return state.taskList;
}
// ストレージ読み込み
export function load() {
  state.taskList = loadStorage();
  if (!state.taskList) {
    state.taskList = [];
  }
}
// ストレージ書き込み
export function save() {
  saveStorage(state.taskList);
}
// 条件指定
export function applyFilter(filter) {
  if (filter) {
    state.filter = filter;
  }
  let filteredList = state.taskList;
  if (state.filter !== "all") {
    filteredList = [...state.taskList].filter(
      (task) => state.filter === task.status,
    );
  }
  return filteredList;
}

// 追加
export function createTask(taskName) {
  const now = new Date();
  let tomorrow;
  // yyyy-mm-dd
  if (now.getMonth() + 1 < 10) {
    tomorrow = `${now.getFullYear()}-0${now.getMonth() + 1}-${now.getDate() + 1}`;
  } else {
    tomorrow = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + 1}`;
  }
  let task = {
    id: crypto.randomUUID(),
    name: taskName,
    status: "active",
    deadline: tomorrow,
    editFlg: false,
  };
  state.taskList.push(task);
}
// 更新(パッチ)
export function updateTask(id, patch) {
  // 更新対象
  const task = [...state.taskList].find((task) => task.id === id);
  Object.assign(task, patch);
}
// 削除
export function deleteTask(id) {
  state.taskList = [...state.taskList].filter((task) => task.id !== id);
}
// キャンセル
export function cancelEdit() {
  state.taskList.forEach((task) => (task.editFlg = false));
}
