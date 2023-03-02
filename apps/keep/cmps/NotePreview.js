
// בס"ד
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import { eventBusService } from "../../../services/event-bus.service.js"
export default{
    props: ['note'],
    template:`

<div :style="{backgroundColor:this.note.style.backgroundColor}"> 
   <Component 
            :is="note.type"  
            :info="note.info" />
            <button @click="remove(note.id)">Close</button>
                </div>

    `,
    data(){
        return{
          
        }
    },
    created(){
   
        
    },
    methods:{
        remove(noteId){
            eventBusService.emit('removeNote',noteId)
        },
       

    },computed:{

    },
    components:{
        NoteTxt,
        NoteImg,
    }

}