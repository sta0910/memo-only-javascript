export default class NotesView {
    constructor(
        root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
    ) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML =
            `
        <div class="notesSidebar">
            <button class="notesAdd" type="button">ノートを追加</button>
            <div class="notesList">
                <div class="notesList-item">

                </div>
            </div>
        </div>
        <!-- ノートプレビュー -->
        <div class="notesPreview">
            <input type="text" class="notesTitle" placeholder="タイトルを記入" />
            <textarea class="notesBody" placeholder="ここに本文を追加"></textarea>
        </div>`;

        const btnAddNote = this.root.querySelector(".notesAdd")
        const inputTitle = this.root.querySelector(".notesTitle")
        const inputBody = this.root.querySelector(".notesBody")



        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd()
        });

        [inputTitle, inputBody].forEach((inputField) => {
            inputField.addEventListener("blur", () => { //blurは要素の外をクリックしたら発火する 
                const updateTitle = inputTitle.value.trim()
                const updateBody = inputBody.value.trim()

                this.onNoteEdit(updateTitle, updateBody);
            });
        })
    }

    _createListItemHTML(id, title, body, updated) { //なぜ＿をつけたのかーこのnoteview.jsでしか使わないため（private method）
        const MAX_BODY_LENGTH = 60;

        return `
        <div class="notesList-item" data-note-id=${id}>
            <div class="notesSmall-title">
                ${title}
            </div>
                <div class="notesSmall-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > 60 ? "..." : ""}
                </div>
             <div class="notesSmall-updated">
                 ${updated.toLocaleString()} 
            </div>
        </div>
        `
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notesList");

        //↓倍倍で表示されるのでリフレッシュする
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(
                note.id,
                note.title,
                note.body,
                new Date(note.updated)
            );
            notesListContainer.insertAdjacentHTML("beforeend", html)
        }

        //メモの選択
        notesListContainer.querySelectorAll(".notesList-item")
            .forEach((noteListItem) => {
                noteListItem.addEventListener("click", () => {
                    // console.log(noteListItem.dataset)
                    this.onNoteSelect(noteListItem.dataset.noteId)
                });

                noteListItem.addEventListener("dblclick", () => {
                    const doDelete = confirm("本当にこのメモを消しますか？")
                    if (doDelete) {
                        this.onNoteDelete(noteListItem.dataset.noteId)
                    }
                })
            })
    }

    updateActiveNote(note) {
        //プレビュー欄にメモの要素を表示する.
        this.root.querySelector(".notesTitle").value = note.title;
        this.root.querySelector(".notesBody").value = note.body;

        this.root.querySelectorAll(".notesList-item").forEach((noteListItem) => {
            noteListItem.classList.remove("notesList-item--selected");
        });

        this.root
            .querySelector(`.notesList-item[data-note-id="${note.id}"]`)
            .classList.add("notesList-item--selected");
    }
}