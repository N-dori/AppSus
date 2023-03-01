// בס"ד
import NotePreview from'../cmps/NotePreview.js'
import NoteHeader from'../cmps/NoteHeader.js'
 //import noteService from ''

export default {
    template:`
   
    <NoteHeader/>
    <NotePreview/>
    `,
    created(){

    },
    methods:{

    },computed:{

    },
    components: {
   //     noteService,
        NotePreview,
        NoteHeader,
    }

}