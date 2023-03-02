// בס"ד

import { eventBus } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

export default {
    props: [],
    template: `
        <pre v-if="mail">{{ mail }}</pre>
        <section class="mail-details-container">
              <button class ="go-back" @click="goBack">Back to inbox</button>
        <section class="mail-details" v-if="mail">
            <p>{{ mail.subject }}</p>
            <p>From: {{ mail.from }}</p>
            <p>{{ mail.body }}</p>
        </section> 
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