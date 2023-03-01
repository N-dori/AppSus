
// בס"ד
import NoteTxt from "./NoteTxt.js"
export default{
    props: ['note'],
    template:`
   <div >  <Component 
            :is="note.type"  
            :info="note.info" />
                </div>

    `,
    created(){

    },
    methods:{

    },computed:{

    },
    components:{
        NoteTxt,
    }

}