// בס"ד

import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['mail'],
    template: `
    <p v-if="mail" @click="showDetails">
        <span>{{ mail.from }}</span> &emsp; 
        <span>{{ mail.subject }}</span> - 
        <span>{{ mail.body }}</span>
    </p>
    `,
    data() {
        return {
        }
    },
    methods: {
        showDetails() {
            this.$router.push('/mail/details/' + this.mail.id)
        }
    },
    computed: {
    },
    created() {
    },
    components: {
    },
    emits: [
        'detail',
    ],
}