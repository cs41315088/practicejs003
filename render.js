// 引数データをもとにレンダリング
export function render(list, display, handlers) {
  // リセット
  display.innerHTML = "";
  list.forEach((task) => {
    const li = document.createElement("li");
    li.className = "";
    const divA = document.createElement("div");
    divA.className = "flex gap-2 items-center";
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = task.status === "done" ? true : false;
    checkBox.className = "w-5 h-5 accent-green-600 cursor-pointer";
    checkBox.onclick = () => {
      const status = checkBox.checked === true ? "done" : "active";
      handlers.onUpdateTask(task.id, { status: status }, display);
    };
    if (!task.editFlg) {
      const name = document.createElement("div");
      name.className = "";
      name.textContent = task.name;
      const deadline = document.createElement("div");
      deadline.className = "";
      deadline.textContent = task.deadline;
      const editBtn = document.createElement("button");
      editBtn.className = "p-2 rounded hover:bg-gray-200";
      editBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
            </svg>
            `;
      editBtn.onclick = () => {
        handlers.onEditTask(task.id, { editFlg: true }, display);
      };
      const deleteBtn = document.createElement("button");
      deleteBtn.className =
        "p-2 rounded text-red-600 hover:text-red-800 hover:bg-gray-200";
      deleteBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862
                     a2 2 0 01-1.995-1.858L5 7m5
                     4v6m4-6v6M1 7h22M9 7V4
                     a1 1 0 011-1h4a1 1 0 011 1v3" />
            </svg>
            `;
      deleteBtn.onclick = () => {
        handlers.onDeleteTask(task.id, display);
      };
      divA.append(checkBox, name, deadline, editBtn, deleteBtn);
    } else {
      const name = document.createElement("input");
      name.className = "";
      name.value = task.name;
      const deadline = document.createElement("input");
      deadline.type = "date";
      deadline.value = task.deadline;
      const updateBtn = document.createElement("button");
      updateBtn.textContent = "更新";
      updateBtn.onclick = () => {
        handlers.onUpdateTask(
          task.id,
          {
            name: name.value,
            editFlg: false,
            deadline: deadline.value,
          },
          display,
        );
      };
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "ｷｬﾝｾﾙ";
      cancelBtn.onclick = () => {
        handlers.onCancelEdit(display);
      };

      divA.append(checkBox, name, deadline, updateBtn, cancelBtn);
    }
    li.append(divA);
    display.append(li);
  });
}
