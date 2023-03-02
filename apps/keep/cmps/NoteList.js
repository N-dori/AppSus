import NotePreview from "./NotePreview.js"

export default {
    props: ['notes'],
    template: `
    <section>
  
		<article class="cards-container">
        <ul>
         <li class="note-card" v-for="note in notes" :key="note.id">
	      <NotePreview :note="note"/>
            <button>Close</button>
        </li>
            </ul>
		
		 </article>
    </section> 
    
    `,
    data() {
        return {
          
        }
    },
    methods: {
    },
    computed: {
    },
    created() {
    },
    components: {
        NotePreview,
       
    },
    emits: [],
}