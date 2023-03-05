// בס"ד

// import { eventBus, eventBusService } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
import { integrationService } from '../../../services/integration.service.js'
import { svgService } from '../../../services/svg.service.js'

export default {
    props: [],
    template: `
        <section class="mail-details-container">
        <section class="mail-details-btns">
            <button class ="go-back-btn" @click="goBack">Back to inbox</button>
            <button class="to-note-btn" @click="toNote">To note</button>
        </section>      
        <section class="mail-details" v-if="mail">
            <h2>{{ mail.subject }}</h2>
            <h3>From: {{ mail.from }}</h3>
            <p>{{ mail.body }}</p>
        </section> 
        <div @click="deleteMail" className="mail-trash-icon" v-html="getNoteSvg('trash')"></div>
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
            let title = note.info.title
            let body = note.info.body
            // console.log('title,body',title,body)
            // eventBusService.emit('mail-note')
            this.$router.push('/keep/' + title + '/' + body)
        },
        deleteMail() {
            mailService.deleteMail(this.mail)

            this.$emit('mail-deleted')

            this.$router.push('/mail')
        },
        getNoteSvg(iconName) {
            return svgService.getNoteSvg(iconName)
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
    emits: ['mail-deleted',
    ],
}