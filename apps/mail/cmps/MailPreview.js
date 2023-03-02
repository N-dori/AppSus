// בס"ד

import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['mail'],
    template: `
    <p v-if="mail" @click="showDetails" :class="isRead">
        <span :class="isRead">{{ mail.from }}</span> &emsp; 
        <span>{{ mail.subject }}</span> - 
        <span>{{ mail.body }}</span>&emsp;
        <span>{{ getDate }}</span>
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
        isRead() {
            return this.mail.isRead ? 'read' : 'unread'
        },
        getDate() {
            let date = new Date(this.mail.sentAt).getDate()
            return date
        }
    },
    created() {
    },
    components: {
    },
    emits: [
        'detail',
    ],
}