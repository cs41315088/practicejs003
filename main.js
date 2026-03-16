import { auth } from "./firebase-init.js";
import { handlers } from "./handlers.js";
import { render } from "./render.js";
import { getTaskList, load } from "./state.js";
import {
  loginWithGoogle,
  logout,
  handleRedirectResult,
  userInfo,
} from "./auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getApps } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  setPersistence,
  browserLocalPersistence,
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

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
logoutBtn.onclick = async () => {
  await logout();
};

// 初期処理
async function init() {
  await setPersistence(auth, browserLocalPersistence);
  //  ① Redirect結果処理（最初に）
  await handleRedirectResult();
  console.log("test");
  //  ② ログイン状態監視
  onAuthStateChanged(auth, async (user) => {
    console.log("Firebase apps:", getApps());
    console.log(auth.app.name);
    console.log("user:", user);
    console.log("currentUser:", auth.currentUser);
    if (user) {
      userInfo.useruid = user.uid;
      authArea.style.display = "none";
      appArea.style.display = "block";
      // データ読込
      await load(userInfo.useruid); // firestore対応
      let taskList = getTaskList();
      // レンダリング
      if (taskList && taskList.length !== 0) {
        render(taskList, displayTask, handlers);
      }
      // イベント登録

      // onclick紐づけ
      // 追加ボタン
      addTaskBtn.onclick = () => {
        handlers.onAddTask(userInfo.useruid, inputNewTask, displayTask);
      };
      // 追加時enterkey
      inputNewTask.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.isComposing) {
          // e.isComposing: 変換時true
          handlers.onAddTask(userInfo.useruid, inputNewTask, displayTask);
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
        handlers.ondrop(userInfo.useruid, dragId, dropId, displayTask);
      });
    } else {
      authArea.style.display = "flex";
      appArea.style.display = "none";
    }
  });
}

init();
