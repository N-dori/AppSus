// בס"ד

import { mailService } from '../services/mail.service.js'
import { svgService } from "../../../services/svg.service.js"
// import { storageService } from '../../../services/async-storage.service.js'
// import { eventBusService } from "../../../services/event-bus.service.js"

import MailList from '../cmps/MailList.js'
import MailFilter from '../cmps/MailFilter.js'
import MailCompose from '../cmps/MailCompose.js'

export default {
    props: [],
    template: `
    <section class="mail-grid">
    <MailFilter @filter="filterBy"/>

    <section class="side-bar">
        <button class="compose-btn" @click="toggleCompose"><div className="mail-compose-icon" v-html="getMailSvg('compose')"></div>
<span>Compose</span></button>
    <ul class="filter-list">
        <li><button @click ="showMail('inbox')"><div className="mail-inbox-icon" v-html="getMailSvg('inbox')"></div>
</button></li>
        <li @click ="showMail('sent')"><button><div className="mail-sent-icon" v-html="getMailSvg('sent')"></div>
</button></li>
        <li @click ="showMail('trash')"><button><div className="mail-trash-icon" v-html="getNoteSvg('trash')"></div>
</button></li>
    </ul>
    </section>

    <MailList @mails-update="showMail" v-if="mails" :list="this.list" :mails="this.mails"/>

    <MailCompose v-if="isCompose" :list="this.list" @mail-sent="updateMails"
    @close-compose="toggleCompose"/>
    </section>
       
    `,
    data() {
        return {
            mails: null,
            isCompose: false,
            list: 'inbox',
        }
    },
    methods: {
        toggleCompose() {
            this.isCompose = !this.isCompose
        },
        updateMails(payload) {
            this.toggleCompose()

            mailService.getMail(payload.res.id)
                .then(res => {
                    this.mails.unshift(payload.res)
                    this.showMail(payload.list)
                })
        },
        sort(arr) {
            return arr.sort((a, b) =>
                b['sentAt'] - a['sentAt']
            )
        },
        filterBy(val) {
            switch (val) {
                case 'text':
                    this.mails = mailService.filterByText()
                    // this.showMail(this.list)
                    break

                case 'isRead':
                    this.mails = mailService.filterByRead()
                    // this.showMail(this.list)
                    break

                case 'isStar':
                    this.mails = mailService.filterByStar()
                    // this.showMail(this.list)
                    break
            }
        },
        reboot() {
            mailService.getMails()
                .then(res => this.mails = res)
        },
        setParams() {
            this.isCompose = this.$route.params.isCompose === 'true' ? true : false
        },
        showMail(val) {
            this.list = val
            this.mails = mailService.showBy(val)
            this.mails = this.sort(this.mails)
        },
        getNoteSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
        getMailSvg(iconName) {
            return svgService.getMailSvg(iconName)
        },
    },
    computed: {
    },
    created() {
        mailService.createDemoMails()
        mailService.getMails()
            .then(res => {
                this.mails = res
                this.showMail('inbox')
            }
            )

        this.setParams()
    },
    components: {
        MailList,
        MailFilter,
        MailCompose,
        svgService,
        // eventBusService,
    },
    emits: [],
}