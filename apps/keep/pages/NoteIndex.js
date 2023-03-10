// בס"ד

import NotePreview from '../cmps/NotePreview.js'
import { noteService } from '../services/note.service.js'
import NoteHeader from '../cmps/NoteHeader.js'
import NoteList from '../cmps/NoteList.js'
import Modal from '../cmps/Modal.js'
import TrashList from '../cmps/TrashList.js'
import { svgService } from '../../../services/svg.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'
import ColorPicker from '../cmps/ColorPicker.js'
import { utilService } from '../../../services/util.service.js'

export default {
    template: `
        <NoteHeader @onopenNav="openNav" @onSearch="filter"/>
    <div></div>
    <main class="txt-edit-layout">
        <nav v-if="isNavOpen" class="main-nav">
            <li @click="setRoute('notes')"><div class="icon"> <span v-html="setSvg('lightBolb')"></span></div></li>  
            <li @click="setRoute('trash')"><div class="icon"> <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 96 960 960" width="30"><path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/></svg></div></li>  
     
        </nav>
        <section v-if="!isTrashOpen" :style="{backgroundColor:this.color}" class="txt-editor">
    <form @submit.prevent="pushNote"  >
            <div class="inputs-container">
       <input  class="txt-editor-title" type="text" 
             v-model="note.info.title" 
             placeholder="Title">
        <input type="text" v-model="note.info.body" 
       placeholder="Take A note">
     </div>
        <div  class="txt-editor-buttons">
        <div class="svg-icons"> 
       <div @click="isShown=!isShown"> <div v-html="setSvg('palette')"></div></div>

       <div class="file-dialog"><input @change="uploadPic($event)" class="btn-file-dialog"  type="file" name="file"><div v-html="setSvg('img')"></div></div> 
       
       <div v-html="setSvg('youtube')"></div>
       <div v-html="setSvg('check')"></div>
    </div>   
    <button type="submit" >Close</button>
</div>
    </form>
    <ColorPicker v-if="isShown" @colorChanged="changeColor" />
</section >
    <section v-if="!isTrashOpen"  class="pinned-unpinned-container">
   <NoteList  @pinChanged="updateAllNotes" v-if="PinedNotes" 
   :notes="PinedNotes"
  />

   <NoteList  @pinChanged="updateAllNotes" v-if="unPinedNotes" :notes="unPinedNotes"
  />
</section>
 <Modal @updateNote="updateNote" :clickedNote="clickedNote" @closeModal="isModalOpen=null" v-if="isModalOpen" />
 <section v-if="isTrashOpen" calss="deleted-notes">
     <TrashList @deleteNoteForever="deleteNoteForever" :trashNotes="trashNotes" />
    </section>
</main> 
   `,
    data() {
        return {
            // title: "",
            // body: "",
            note: {},
            notes: [],
            PinedNotes: null,
            unPinedNotes: null,
            filterBy: {},
            isShown: false,
            color: '',
            isClicked: false,
            isModalOpen: null,
            isNavOpen: false,
            isTrashOpen: false,
            trashNotes: [],
            clickedNote: null,

        }
    },

    created() {
        this.note = noteService.getEmptyNote('NoteTxt')
        this.trashNotes = utilService.loadFromStorage('deletedDB')||[]
        eventBusService.on('removeNote', (noteId) => {
            const note = this.notes.find(note => note.id === noteId)
            this.trashNotes.push(note)
            utilService.saveToStorage('deletedDB', this.trashNotes)
            noteService.remove(noteId)
            if (note.isPinned) {
                const idx = this.PinedNotes.findIndex(note => note.id === noteId)
                this.PinedNotes.splice(idx, 1)
            } else {
                const idx = this.unPinedNotes.findIndex(note => note.id === noteId)
                this.unPinedNotes.splice(idx, 1)
            }
        })
        eventBusService.on('onOpenModal', (note) => {
            console.log('idex onModal', note);
            this.clickedNote = note
            console.log(' this.clickedNote', this.clickedNote);

            this.isModalOpen = true


        })

        this.reboot()

        this.setParams()
    },
    mounted() {

    },
    methods: {
        setParams() {
            this.note.info.title = this.$route.params.title
            this.note.info.body = this.$route.params.body
        },
        updateNote(updatedNote) {
            let noteToUpDate = this.notes.find(note => note.id === updatedNote.id)
            noteToUpDate = updatedNote
            noteService.put(noteToUpDate)
                .then(note => {
                    this.reboot()
                })

        },
        changeColor(color) {
            this.color = color
            this.note.style.backgroundColor = color
        },

        pushNote() {
            if (this.note.info.url === null) {
                console.log('note type changed');

                this.note.type = 'NoteTxt'
            } else {
                this.note.type = "NoteImg"
                console.log('note type changed');
            }
            noteService.save(this.note)
                .then(note => {
                    console.log(' pushnote', note);
                    this.notes.push(note)
                    this.unPinedNotes.push(note)
                    this.note = noteService.getEmptyNote('NoteTxt')
                    this.note.style.backgroundColor = '#fff'

                })

        },

        setType(type) {
            console.log('tyoe', type);
        },
        setSvg(type) {
            return svgService.getNoteSvg(type)


        }, updateAllNotes() {
            this.notes = []
            this.notes = [... this.PinedNotes, ... this.unPinedNotes]

            noteService.saveNotes(this.notes)
            this.reboot()
        },
        reboot() {
            noteService.query()
                .then(notes => {
                    this.notes = notes
                    this.PinedNotes = this.notes.filter(note => note.isPinned === true)
                    this.unPinedNotes = this.notes.filter(note => note.isPinned === false)
                })
        }, filter(txt) {
            const txtRegex = new RegExp(txt, 'i')
            const filterdNotes = this.notes.filter(item =>
                txtRegex.test(item.info.title))

            this.PinedNotes = filterdNotes.filter(note => note.isPinned === true)
            this.unPinedNotes = filterdNotes.filter(note => note.isPinned === false)
        },
        uploadPic(e) {

            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                const imageData = e.target.result;
                this.note.info.url = imageData

            };
        }, openNav() {
            this.isNavOpen = !this.isNavOpen
        }, setRoute(type) {
            if (type === 'trash' && this.isTrashOpen === false) this.isTrashOpen = !this.isTrashOpen
            if (type === 'notes' && this.isTrashOpen === true) this.isTrashOpen = !this.isTrashOpen

        }, deleteNoteForever(noteId) {
            const idx = this.trashNotes.findIndex(item => item.id === noteId)
            this.trashNotes.splice(idx, 1)

        }
    }, computed: {

    },
    components: {
        noteService,
        NotePreview,
        NoteHeader,
        NoteList,
        ColorPicker,
        Modal,
        TrashList,

    },
    emits: ['removeNote']

}