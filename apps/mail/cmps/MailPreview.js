// בס"ד

import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['mail'],
    template: `
    <p v-if="mail" @click="showDetails" :class="isRead">
        <span :class="isRead">{{ mail.from }}</span> &emsp; 
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
        isRead() {
            return this.mail.isRead ? '' : 'unread'
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