export default {
    props: ['note'],
    template: `
     <img v-if=" this.note.info.url" :src=" this.note.info.url" />
   <h3>{{this.note.info.title}}</h3>
   <h3>{{this.note.info.body}}</h3>
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
    },
    emits: [],
}