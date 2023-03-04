export default {
    props: ['clickedNote'],
    template: `
        <section class="modal" :style="{backgroundColor:this.clickedNote.style.backgroundColor}">
            <div class="updatedNote-inputs-container">
                <input type="text" v-model="title" >
                <input type="text" v-model="body" >
            </div> 
            <img v-if=" img" :src=" img" />
       
        <button @click="onCloseModal" type="submit" >Close</button>
</section>
    
    `,
    data() {
        return {

            title:this.clickedNote.info.title,
            body:this.clickedNote.info.body,
            img:this.clickedNote.info.url
        }
    },
    methods: {
        onCloseModal(){
            this.$emit('closeModal')
            this.clickedNote.info.title=this.title
            this.clickedNote.info.body=this.body
            console.log('this.clickedNote',this.clickedNote);
            
            this.$emit('updateNote',this.clickedNote)
        }
    },
    computed: {
    },
    created() {
        
    },
    components: {
    },
    emits: ['closeModal','updateNote'],
}