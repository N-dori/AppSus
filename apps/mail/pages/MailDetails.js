// בס"ד

import { eventBus, eventBusService } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
import { integrationService } from '../../../services/integration.service.js'

export default {
    props: [],
    template: `
        <section class="mail-details-container">
        <section class="mail-details-btns">
            <button class ="go-back-btn" @click="goBack">Back to inbox</button>
            <button class="to-note-btn" @click="toNote">To note</button>
        </section>      
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
        },
        toNote() {
            let note = integrationService.fromMailToNote(this.mail)
            eventBusService.emit('mail-note', note)
            this.$router.push('/keep')
        },
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
    emits: ['mail-note'],
}