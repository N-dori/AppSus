// בס"ד

export default {
    props: ['info'],
    
    template: `
   <img v-if=" this.info.url" :src=" this.info.url" />
   <h3>{{info.body}}</h3>
   <h3>{{info.title}}</h3>
  
    `,
    data() {
        return {
        }
    },
    created(){
console.log('note img ',this.info);

    },

    methods: {
    },
    computed: {
    },
   
    components: {
    },
    emits: [],
}