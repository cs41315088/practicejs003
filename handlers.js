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
  // firestore対応
  // 追加
  async onAddTask(taskName, display) {
    try {
      cancelEdit();
      createTask(taskName.value);
      await save();
      taskName.value = "";
      const list = applyFilter();
      render(list, display, handlers);
    } catch (e) {
      alert("保存に失敗しました");
      console.error(e);
    }
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
  async onDeleteTask(id, display) {
    try {
      deleteTask(id);
      await save();
      const list = applyFilter();
      render(list, display, handlers);
    } catch (e) {
      alert("保存に失敗しました");
      console.error(e);
    }
  },
  onEditTask(id, patch, display) {
    try {
      cancelEdit();
      updateTask(id, patch);
      const list = applyFilter();
      render(list, display, handlers);
    } catch (e) {
      alert("保存に失敗しました");
      console.error(e);
    }
  },
  onCancelEdit(display) {
    cancelEdit();
    const list = applyFilter();
    render(list, display, handlers);
  },
  async onUpdateTask(id, patch, display) {
    try {
      updateTask(id, patch);
      await save();
      const list = applyFilter();
      render(list, display, handlers);
    } catch (e) {
      alert("保存に失敗しました");
      console.error(e);
    }
  },
  async onCheckTask(id, patch, display) {
    try {
      updateTask(id, patch);
      await save();
      const list = applyFilter();
      render(list, display, handlers);
    } catch (e) {
      alert("保存に失敗しました");
      console.error(e);
    }
  },
  async ondrop(dragId, dropId, display) {
    try {
      reorder(dragId, dropId);
      await save();
      const list = applyFilter();
      render(list, display, handlers);
    } catch (e) {
      alert("保存に失敗しました");
      console.error(e);
    }
  },
};
