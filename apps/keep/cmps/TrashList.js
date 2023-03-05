import TrashPreview from "./TrashPreview.js"
import { svgService } from "../../../services/svg.service.js"
export default {
    props: ['trashNotes'],
    template: `
    <article class="Trash-container">
        <ul>
            <li  class="note-card" v-for="note in trashNotes" :key="note.id">
	  <TrashPreview :note="note"  />
          <div title="DeleteForever" @click="deleteForever(note.id)"><div className="icon" v-html="getSvg('trash')"></div></div>  
        </li>
            </ul>
		 </article>

    `,
    data() {
        return {
            svgTrash:""
        }
    },
    methods: {
        getSvg(symbol){
            return svgService.getNoteSvg(symbol)
        },deleteForever(noteId){
            this.$emit('deleteNoteForever',noteId)
        }
    },
    computed: {
    },
    created() {
     
    },
    components: {
        TrashPreview,
    },
    emits: ['deleteNoteForever'],
}