// בס"ד

import NotePreview from '../cmps/NotePreview.js'
import { noteService } from '../services/note.service.js'
import NoteHeader from '../cmps/NoteHeader.js'
import NoteList from '../cmps/NoteList.js'
import Modal from '../cmps/Modal.js'
import { svgService } from '../../../services/svg.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'
import ColorPicker from '../cmps/ColorPicker.js'

export default {
    template: `
        <NoteHeader @onSearch="filter"/>
    <div></div>
    <main class="txt-edit-layout">
    <section :style="{backgroundColor:this.color}" class="txt-editor">
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
</section>
</main>
   <NoteList  @pinChanged="updateAllNotes" v-if="PinedNotes" 
   :notes="PinedNotes"
  />

   <NoteList  @pinChanged="updateAllNotes" v-if="unPinedNotes" :notes="unPinedNotes"
  />

 <Modal v-if="isModalOpen" />
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
            isModalOpen: null

        }
    },

    created() {
        this.note = noteService.getEmptyNote('NoteTxt')

        eventBusService.on('removeNote', (noteId) => {
            noteService.remove(noteId)
            const note = this.notes.find(note => note.id === noteId)
            if (note.isPinned) {
                const idx = this.PinedNotes.findIndex(note => note.id === noteId)
                this.PinedNotes.splice(idx, 1)
            } else {
                const idx = this.unPinedNotes.findIndex(note => note.id === noteId)
                this.unPinedNotes.splice(idx, 1)
            }
        })

        this.reboot()

        this.setParams()
    },
    mounted() {

    },
    methods: {
        setParams() {
            this.title = this.$route.params.title
            this.body = this.$route.params.body
        },
        changeColor(color) {
            this.color = color
            this.note.style.backgroundColor = color
        },
    
        pushNote() {
            if (this.note.info.url===null) {
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
                  console.log('this.note.info.url', this.note.info.url);
               

                    this.note.style.backgroundColor='#fff'
                     this.note=noteService.getEmptyNote('NoteTxt')
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
                console.log('this.note.info.url', this.note);
              //  this.pushNote()
            };




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

    },
    emits: ['removeNote']

}