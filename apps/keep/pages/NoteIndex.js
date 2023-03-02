// בס"ד
import NotePreview from '../cmps/NotePreview.js'
import { noteService } from '../services/note.service.js'
import NoteHeader from '../cmps/NoteHeader.js'
import NoteList from '../cmps/NoteList.js'
import { svgService } from '../../../services/svg.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'
import ColorPicker from '../cmps/ColorPicker.js'

export default {
    template: `
        <NoteHeader/>
    <div></div>
    <main class="txt-edit-layout">
    <section :style="{backgroundColor:this.color}" class="txt-editor">

        <form  @submit="pushNote">
            <div class="inputs-container">
       <input @click="creatNewNote" @input="setTxt" class="txt-editor-title" type="text" 
             v-model="title"  placeholder="Title">
        <input type="text" v-model="body" @input="setTxt"  placeholder="Take A note">
     </div>
        <div  class="txt-editor-buttons">
     
       <div v-html="setSvg('colorPickerNone')"></div>

       <button type="submit" >+</button>
    </div>
    </form>

    <ColorPicker @colorChanged="changeColor" />
</section>
</main>
   <NoteList :color="this.color" @pinChanged="updateAllNotes" v-if="PinedNotes" :notes="PinedNotes"
   @removeNote="remove"/>

   <NoteList :color="this.color" @pinChanged="updateAllNotes" v-if="unPinedNotes" :notes="unPinedNotes"
   @removeNote="remove"/>

 
    `,
    data() {
        return {
            title: "",
            body: "",
            note: null,
            notes: [],
            PinedNotes: null,
            unPinedNotes: null,
            filterBy: {},
            isShown: false,
            color:'#fefef'
        }
    },

    created() {
        this.reboot()
    },
    methods: {
        remove(noteid) {
            console.log('removeeeee', noteid);
            noteService.remove(noteid)
                const note= this.notes.find(note => note.id === noteid)
                        if (note.isPinned) {
                            const idx = this.PinedNotes.findIndex(note => note.id === noteid)
                            this.PinedNotes.splice(idx, 1)
                        } else {
                            const idx = this.unPinedNotes.findIndex(note => note.id === noteid)
                            this.unPinedNotes.splice(idx, 1)
                        }

                    

                
        },
        changeColor(color) {
            this.color=color
  
        },
        setTxt() {
            this.note.info.title = this.title
            this.note.info.body = this.body
        },
        creatNewNote() {
            const emptyNote = noteService.getEmptyNote()
            this.note = emptyNote


        },
        pushNote() {
            
            noteService.save(this.note)
                .then(note => {
                    this.notes.push(note)
                    this.unPinedNotes.push(note)

                })


        },
        setType(type) {
            console.log('tyoe', type);
        },
        setSvg(type) {
            return svgService.getNoteSvg(type)


        }, updateAllNotes() {
            this.notes = []
            this.PinedNotes
            this.unPinedNotes
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
        }

    }, computed: {

    },
    components: {
        noteService,
        NotePreview,
        NoteHeader,
        NoteList,
        ColorPicker,

    }

}