export default {
    props: ['note'],
    template: `
     <img v-if=" this.note.info.url" :src=" this.note.info.url" />
   <p>{{this.note.info.title}}</p>
   <p>{{this.note.info.body}}</p>
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