// stateから呼び出される
const key = "taskList";

export function loadStorage() {
  const raw = localStorage.getItem(key);
  if (!raw) return;
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error("保存データが壊れています");
  }
  return data;
}

export function saveStorage(list) {
  localStorage.setItem(key, JSON.stringify(list));
}
