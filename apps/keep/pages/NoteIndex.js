// בס"ד
import NotePreview from'../cmps/NotePreview.js'
import { noteService } from '../services/note.service.js'
import NoteHeader from'../cmps/NoteHeader.js'
 //import noteService from ''

export default {
    template:`
        <NoteHeader/>
    <section class="txt-editor">
       <input type="text" v-model="txt" placeholder="search">
       <h1>{{note}}</h1>
   </section>

    <NotePreview/>
    `,
  data() {
        return {
            txt: "",
            note:[],
            filterBy: {},
        }
    },
    
    created(){
        noteService.query()
        .then(notes => this.notes = notes)

    },
    methods:{

    },computed:{

    },
    components: {
       noteService,
        NotePreview,
        NoteHeader,
  
    }

}