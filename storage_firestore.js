import { db, auth } from "./firebase-init.js";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const colRef = collection(db, "todos"); // コレクション参照
// 読み込み
export async function loadStorage() {
  const q = query(
    colRef,
    where("uid", "==", auth.currentUser.uid),
    orderBy("order"),
  ); // order byする
  const snapshot = await getDocs(q); // ドキュメント配列

  return snapshot.docs.map((d) => ({
    // データ構造を変換
    id: d.id,
    ...d.data(),
  }));
}

// 保存(全置換方式) => order振り直しの観点からも洗い替え推奨
export async function saveStorage(list) {
  // 既存削除 => 再保存(ローカルストレージと同じ動きで)
  const q = query(
    colRef,
    where("uid", "==", auth.currentUser.uid),
    orderBy("order"),
  ); // order byする
  const snapshot = await getDocs(q); // ドキュメント配列
  for (const d of snapshot.docs) {
    await deleteDoc(doc(db, "todos", d.id));
  }
  for (let i = 0; i < list.length; i++) {
    const task = list[i];
    task.order = i;
    task.uid = auth.currentUser.uid; // TODO 見直し必要
    await setDoc(doc(db, "todos", task.id), task);
  }
}
