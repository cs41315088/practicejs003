import { handlers } from "./handlers.js";
import { render } from "./render.js";
import { getTaskList, load } from "./state.js";

// html要素取得
const inputNewTask = document.getElementById("inputNewTask");
const addTaskBtn = document.getElementById("addTaskBtn");
const buttons = document.querySelectorAll("#filterButtons button");
const displayTask = document.getElementById("displayTask");

// 初期処理
function init() {
  // データ読込
  load();
  const taskList = getTaskList();
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
  // レンダリング
  if (taskList && taskList.length !== 0) {
    render(taskList, displayTask, handlers);
  }
}

init();
