// בס"ד
import NotePreview from'../cmps/NotePreview.js'
import { noteService } from '../services/note.service.js'
import NoteHeader from'../cmps/NoteHeader.js'


export default {
    template:`
        <NoteHeader/>
    <div @click="isShown=false" class="screen"></div>    
    <section  class="txt-editor">
        <form @submit="">
       <input @click="isShown=!isShown" class="txt-editor-title" type="text" v-model="txt" placeholder="Take A note">
      <div v-if="isShown" class="txt-editor-editor">
       <input type="text" v-model="txt" placeholder="Take A note">
       
       <i class="fa-regular fa-image"></i>
       <i class="fa-regular fa-palette"></i>
       <i class="fa-solid fa-list"></i>
       <i class="fa-brands fa-youtube"></i>
       </div>
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
            isShown:false,
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