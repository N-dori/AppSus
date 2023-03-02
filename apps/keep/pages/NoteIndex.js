// בס"ד
import NotePreview from '../cmps/NotePreview.js'
import { noteService } from '../services/note.service.js'
import NoteHeader from '../cmps/NoteHeader.js'
import NoteList from '../cmps/NoteList.js'


export default {
    template: `
        <NoteHeader/>
    <div></div>
    <main class="txt-edit-layout">
    <section class="txt-editor">
        <form @submit="pushNote">
            <div class="inputs-container">
       <input @click="creatNewNote" @input="setTxt" class="txt-editor-title" type="text" 
             v-model="title"  placeholder="Title">
        <input type="text" v-model="body" @input="setTxt"  placeholder="Take A note">
     </div>
        <div  class="txt-editor-buttons">
       <div class="icons">
       <i @click="setType('img')" title="Image" class="fa-regular fa-image"></i>
       <i @click="setType('Video')"title="Video" class="fa-brands fa-youtube"></i>
       <i @click="setColor('color')" class="fa-solid fa-palette"></i>
       <i @click="setType('Todo')" title="Todo" class="fa-solid fa-check"></i>
</div>
       <button type="submit">+</button>
    </div>
    </form>
</section>

</main>
   <NoteList :notes="notes"/>
 
    `,
    data() {
        return {
            title: "",
            body: "",
            note: null,
            notes: [],
            filterBy: {},
            isShown: false,
        }
    },

    created() {
        noteService.query()
            .then(notes => this.notes = notes)

    },
    methods: {
        setTxt() {
            this.note.info.title = this.title
            this.note.info.body = this.body
        },
        creatNewNote() {
            const emptyNote = noteService.getEmptyNote()
            this.note = emptyNote


        }, pushNote() {
            noteService.save(this.note)
                .then(note => this.notes.push(note))
        },setType(type){
            console.log('tyoe',type);
        },setColor(color){
            
        }

    }, computed: {

    },
    components: {
        noteService,
        NotePreview,
        NoteHeader,
        NoteList,

    }

}