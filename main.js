import { handlers } from "./handlers.js";
import { render } from "./render.js";
import { applyFilter, getTaskList, load, reorder, save } from "./state.js";

// html要素取得
const inputNewTask = document.getElementById("inputNewTask");
const addTaskBtn = document.getElementById("addTaskBtn");
const buttons = document.querySelectorAll("#filterButtons button");
const displayTask = document.getElementById("displayTask");

// 初期処理
function init() {
  // データ読込
  load();
  let taskList = getTaskList();
  // onclick紐づけ
  // 追加ボタン
  addTaskBtn.onclick = () => {
    handlers.onAddTask(inputNewTask, displayTask);
  };
  // フィルタボタン群
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      handlers.onFilterBtn(btn, buttons, displayTask);
    });
  });
  // リスト内要素のドラッグ
  let dragId = null;

  displayTask.addEventListener("dragstart", (e) => {
    dragId = e.target.dataset.id; // e: イベント情報の塊
  });

  displayTask.addEventListener("dragover", (e) => {
    e.preventDefault(); // ← drop可能にする必須
  });

  displayTask.addEventListener("drop", (e) => {
    const dropId = e.target.closest("li").dataset.id;
    handlers.ondrop(dragId, dropId, displayTask);
  });

  // レンダリング
  if (taskList && taskList.length !== 0) {
    render(taskList, displayTask, handlers);
  }
}

init();
