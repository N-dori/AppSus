// בס"ד

import NotePreview from "./NotePreview.js"
import { svgService } from "../../../services/svg.service.js"
export default {
    props: ['notes'],
    template: `
    <section>
  
		<article class="cards-container">
        <ul>
            <li  class="note-card" v-for="note in notes" :key="note.id">
       
             <div @click="changePin(note)" calss="svg-pin" v-html="setSvg('pin')"></div>
	  <NotePreview :note="note"  />
        </li>
            </ul>
		
		 </article>
    </section> 
    
    `,
    data() {
        return {

            isSown: true,
        }
    },
    methods: {
        changePin(note) {
            note.isPinned = !note.isPinned
            this.$emit('pinChanged')

        }, setSvg(type) {
            return svgService.getNoteSvg(type)
        },
    },
    computed: {
    },
    created() {
     //   console.log('notes list ', this.notes);
        
    },
    components: {
        NotePreview,

    },
    emits: ['pinChanged'],
}