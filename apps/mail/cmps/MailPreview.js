// בס"ד

// import { eventBus } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
import { svgService } from "../../../services/svg.service.js"

export default {
    props: ['mail'],
    template: `
    <p v-if="mail" @click="showDetails" :class="isRead">
        <span :class="isRead">{{ mail.from }}</span> &emsp; 
        <span>{{ mail.subject }}</span> - 
        <span>{{ mail.body }}</span>&emsp;
        <span>{{ getDate }}</span>
        <div @click.prevent="deleteMail" className="mail-trash" v-html="getSvg('trash')"></div>
    </p>
    `,
    data() {
        return {
        }
    },
    methods: {
        showDetails() {
            this.mail.isRead = true
            mailService.updateMail(this.mail)
            this.$router.push('/mail/details/' + this.mail.id)
        },
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
        deleteMail(){
            console.log('hi from delete')
        },
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
        svgService,
    },
    emits: [
        'detail',
    ],
}