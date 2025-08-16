import App from "./App.js";
import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";


const root = document.getElementById("app")

const app = new App(root);
// const view = new NotesView(app, {
//     onNoteSelect(id) {
//         console.log(`${id}のノートが選択されました`)
//     },
//     onNoteAdd() {
//         console.log("ノ―とがクリックされました")
//     },
//     onNoteEdit(newTitle, newBody) {
//         console.log(newTitle);
//         console.log(newBody);
//     },
//     onNoteDelete(id) {
//         console.log(`${id}のノートが削除されました`)
//     }
// });

// console.log(NotesAPI.getAllNotes());

// const notes = NotesAPI.getAllNotes();

// //サイドバーにメモをすべて表示する
// view.updateNoteList(notes)

// //プレビューにメモ内容を表示する
// view.updateActiveNote(notes[0]);
