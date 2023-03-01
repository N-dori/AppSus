// בס"ד
import NotePreview from'../cmps/NotePreview.js'
import { noteService } from '../services/note.service.js'
import NoteHeader from'../cmps/NoteHeader.js'
import NoteTxt from '../cmps/NoteTxt.js'


export default {
    template:`
        <NoteHeader/>

    <section @click="" class="txt-editor">
        <form @submit="">
       <input @click="isShown=true, setTitle" class="txt-editor-title" type="text" 
             v-model="title"  placeholder="Take A note">
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
   <NoteTxt  />
    <NotePreview/>
    `,
  data() {
        return {
           title: "",
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
        setTitle(){
            console.log('set title', this. title);
            
        }

    },computed:{

    },
    components: {
       noteService,
        NotePreview,
        NoteHeader,
        NoteTxt,
  
    }

}