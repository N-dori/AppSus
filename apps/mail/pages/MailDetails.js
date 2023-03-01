// בס"ד

import { eventBus } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

export default {
    props: [],
    template: `
        <pre v-if="mail">{{ mail }}</pre>
        <section v-if="mail">
            <button @click="goBack">Back to inbox</button>
            <p :class="isRead">{{ mail.subject }}</p>
            <p :class="isRead">{{ mail.from }}</p>
            <p :class="isRead">{{ mail.body }}</p>
        </section>
    `,
    data() {
        return {
            mailId: null,
            mail: null,
        }
    },
    methods: {
        goBack() {
            this.$router.push('/mail')
        }
    },
    computed: {
        isRead() {
            return this.mail.isRead ? '' : 'unread'
        }
    },
    created() {
        this.mailId = this.$route.params.mailId
        mailService.getMail(this.mailId)
            .then(res => this.mail = res)
    },
    components: {
    },
    emits: [],
}