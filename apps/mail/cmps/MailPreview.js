// בס"ד

export default {
    props: [],
    template: `
    <h1 @click="push">hi from preview</h1>
    `,
    data() {
        return {
        }
    },
    methods: {
        push(){
            console.log('hi');
            
            this.$router.push('/mail/details')
        }
    },
    computed: {
    },
    created() {
    },
    components: {
    },
    emits: [],
}