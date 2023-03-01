// בס"ד
import NotePreview from'../cmps/NotePreview.js'
import { noteService } from '../services/note.service.js'
import NoteHeader from'../cmps/NoteHeader.js'


export default {
    template:`
        <NoteHeader/>
    <section class="txt-editor">
        <form @submit="">
       <input type="text" v-model="txt" placeholder="search">
       <i class="fa-regular fa-envelope"></i> 
    </form>
       <pre>{{notes}}</pre>
   </section>

    <NotePreview/>
    `,
  data() {
        return {
            txt: "",
            notes:[],
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