// בס"ד

// import { eventBus } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
import { svgService } from "../../../services/svg.service.js"

export default {
    props: ['mail'],
    template: `
    <p v-if="mail" :class="isRead">
       <section @click="showDetails" >
        <span :class="isRead">{{ mail.from }}</span> &emsp; 
        <span>{{ mail.subject }}</span> - 
        <span>{{ mail.body }}</span> &emsp;
    </section>
    <section>
        <span>{{ getDate }}</span>
        <div @click="deleteMail" className="mail-trash" v-html="getSvg('trash')"></div>
    </section>
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
        deleteMail() {
            mailService.deleteMail(this.mail)
            console.log('hi pre');

            this.$emit('mail-deleted')
        },
    },
    computed: {
        isRead() {
            return this.mail.isRead ? 'read' : 'unread'
        },
        getDate() {
            let date = new Date(this.mail.sentAt).getDate()
            let month = new Date(this.mail.sentAt).toLocaleString('en', { month: 'short' })
            return month + ' ' + date
        }
    },
    created() {
    },
    components: {
        svgService,
    },
    emits: [
        'detail',
        'mail-deleted',
    ],
}