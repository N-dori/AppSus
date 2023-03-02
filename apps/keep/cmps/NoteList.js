import NotePreview from "./NotePreview.js"
import { svgService } from "../../../services/svg.service.js"
export default {
    props: ['notes','color'],
    template: `
    <section>
  
		<article class="cards-container">
        <ul>
            <li  class="note-card" v-for="note in notes" :key="note.id">
             <div @click="changePin(note)" calss="svg-pin" v-html="setSvg('pin')"></div>
	  <NotePreview  :note="note"  />
            <button @click="remove(note.id)">Close</button>
        </li>
            </ul>
		
		 </article>
    </section> 
    
    `,
    data() {
        return {
            isSown:true,
        }
    },
    methods: {
        remove(noteId){
   
            this.$emit('removeNote',noteId)

        }, changePin(note){
         note.isPinned= !note.isPinned
        this.$emit('pinChanged')
         
        },  setSvg(type){
            return svgService.getNoteSvg(type) 
          },
    },
    computed: {
    },
    created() {
    },
    components: {
        NotePreview,
       
    },
    emits: ['removeNote','pinChanged'],
}