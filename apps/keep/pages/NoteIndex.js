// בס"ד
import NotePreview from'../cmps/NotePreview.js'
import { noteService } from '../services/note.service.js'
import NoteHeader from'../cmps/NoteHeader.js'
import NoteList from '../cmps/NoteList.js'


export default {
    template:`
        <NoteHeader/>

    <section @click="" class="txt-editor">
        <form @submit="pushNote">
       <input @click="creatNewNote" @input="setTxt" class="txt-editor-title" type="text" 
             v-model="title"  placeholder="Take A note">
      <div  class="txt-editor-editor">
       <input type="text" v-model="body" @input="setTxt"  placeholder="Take A note">
       
       <i class="fa-regular fa-image"></i>
       <i class="fa-regular fa-palette"></i>
       <i class="fa-solid fa-list"></i>
       <i class="fa-brands fa-youtube"></i>
       </div>
       <button type="submit">+</button>
    </form>
 
   </section>
   <NoteList :notes="notes"/>
 
    `,
  data() {
        return {
            title:"",
            body:"",
            note:null,
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
        setTxt(){
          this.note.info.title=this.title
          this.note.info.body=this.body
        },
        creatNewNote(){
            const emptyNote=noteService.getEmptyNote()
            this.note= emptyNote
        
            
        },pushNote(){
       
            noteService.save(this.note)
            .then(note=>this.notes.push(note))

        }

    },computed:{

    },
    components: {
       noteService,
        NotePreview,
        NoteHeader,
        NoteList,
  
    }

}