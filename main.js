import { auth } from "./firebase-init.js";
import { handlers } from "./handlers.js";
import { render } from "./render.js";
import { getTaskList, load } from "./state.js";
import { loginWithGoogle, logout } from "./auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// html要素取得
const inputNewTask = document.getElementById("inputNewTask");
const addTaskBtn = document.getElementById("addTaskBtn");
const buttons = document.querySelectorAll("#filterButtons button");
const displayTask = document.getElementById("displayTask");

const authArea = document.getElementById("authArea");
const appArea = document.getElementById("app");
const loginBtn = document.getElementById("googleLoginBtn");
const logoutBtn = document.getElementById("logoutBtn");

loginBtn.onclick = async () => {
  await loginWithGoogle();
};

// 初期処理
async function init() {
  // データ読込
  await load(); // firestore対応
  let taskList = getTaskList();
  // onclick紐づけ
  // 追加ボタン
  addTaskBtn.onclick = () => {
    handlers.onAddTask(inputNewTask, displayTask);
  };
  // 追加時enterkey
  inputNewTask.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.isComposing) {
      // e.isComposing: 変換時true
      handlers.onAddTask(inputNewTask, displayTask);
    }
  });
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

  logoutBtn.onclick = async () => {
    await logout();
  };

  // レンダリング
  if (taskList && taskList.length !== 0) {
    render(taskList, displayTask, handlers);
  }
}

// ログイン処理
onAuthStateChanged(auth, async (user) => {
  // userの中身？
  if (user) {
    authArea.style.display = "none";
    appArea.style.display = "block";
    init();
  } else {
    authArea.style.display = "flex";
    appArea.style.display = "none";
  }
});
