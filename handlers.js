// onclickで起動するメソッド群を定義

import { render } from "./render.js";
import {
  applyFilter,
  cancelEdit,
  createTask,
  deleteTask,
  reorder,
  save,
  updateTask,
} from "./state.js";

export const handlers = {
  // 追加
  onAddTask(taskName, display) {
    cancelEdit();
    createTask(taskName.value);
    save();
    taskName.value = "";
    const list = applyFilter();
    render(list, display, handlers);
  },
  onFilterBtn(btn, buttons, display) {
    // UI更新（全ボタンをリセット）
    buttons.forEach((b) => {
      b.classList.remove("bg-green-500", "text-white");
      b.classList.add("bg-gray-200");
    });

    // 押されたボタンをアクティブに
    btn.classList.remove("bg-gray-200");
    btn.classList.add("bg-green-500", "text-white");

    // フィルタ適用
    const filter = btn.dataset.filter;
    const list = applyFilter(filter);
    render(list, display, handlers);
  },
  onDeleteTask(id, display) {
    deleteTask(id);
    save();
    const list = applyFilter();
    render(list, display, handlers);
  },
  onEditTask(id, patch, display) {
    cancelEdit();
    updateTask(id, patch);
    const list = applyFilter();
    render(list, display, handlers);
  },
  onCancelEdit(display) {
    cancelEdit();
    const list = applyFilter();
    render(list, display, handlers);
  },
  onUpdateTask(id, patch, display) {
    updateTask(id, patch);
    save();
    const list = applyFilter();
    render(list, display, handlers);
  },
  onCheckTask(id, patch, display) {
    updateTask(id, patch);
    save();
    const list = applyFilter();
    render(list, display, handlers);
  },
  ondrop(dragId, dropId, display) {
    reorder(dragId, dropId);
    save();
    const list = applyFilter();
    render(list, display, handlers);
  },
};
