// בס"ד

// import { eventBus } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
import { svgService } from "../../../services/svg.service.js"

export default {
    props: ['mail'],
    template: `
    <p v-if="mail" :class="isRead">
        <section >
            <section :class="myStar" @click="toggleStar">
                <div className="mail-star-icon" v-html="getMailSvg(myStar)"></div>
            </section>
            <section @click="showDetails" >
                <span :class="isRead">{{ mail.from }}</span> &emsp; 
                <span>{{ mail.subject }}</span> - 
                <span>{{ mail.body }}</span> &emsp;
            </section>
        </section>
        <section>
            <span>{{ getDate }}</span>
            <div @click="deleteMail" className="mail-trash-icon" v-html="getNoteSvg('trash')"></div>
        </section>
    </p>
    `,
    data() {
        return {
            // star: '',
        }
    },
    created() {
        // this.star = this.mail.isStared ? 'starFill' : 'star'
    },
    methods: {
        showDetails() {
            this.mail.isRead = true
            mailService.updateMail(this.mail)
            this.$router.push('/mail/details/' + this.mail.id)
        },
        getNoteSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
        getMailSvg(iconName) {
            // console.log('this.star', this.star)
            return svgService.getMailSvg(iconName)
        },
        deleteMail() {
            mailService.deleteMail(this.mail)
            this.$emit('mail-deleted')
        },
        toggleStar() {
            this.mail.isStared = !this.mail.isStared
            mailService.updateMail(this.mail)

            if (this.star === 'star') {
                this.star = 'starFill'
                return
            }

            this.star = 'star'
        },
    },
    computed: {
        myStar() {
            return this.mail.isStared ? 'starFill' : 'star'
        },
        isRead() {
            return this.mail.isRead ? 'read' : 'unread'
        },
        getDate() {
            let date = new Date(this.mail.sentAt).getDate()
            let month = new Date(this.mail.sentAt).toLocaleString('en', { month: 'short' })
            return month + ' ' + date
        }
    },
    mounted() {
    },
    // watch: {
    //     star() {
    //         console.log('hi');

    //         this.myStar
    //     }
    // },
    components: {
        svgService,
    },
    emits: [
        'detail',
        'mail-deleted',
    ],
}