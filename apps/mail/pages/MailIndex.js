// בס"ד

import { mailService } from '../services/mail.service.js'
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
        <button class="compose-btn" @click="toggleCompose"><span>{{ ComposeMsg }}</span><span>Compose</span></button>
    <ul class="filter-list">
        <li><button @click ="showMail('inbox')">inbox</button></li>
        <li @click ="showMail('sent')"><button>sent</button></li>
        <li @click ="showMail('trash')"><button>trash</button></li>
    </ul>
    </section>



    <MailList @mails-update="showMail" v-if="mails" :list="this.list" :mails="mails"/>


    <MailCompose v-if="isCompose" :list="this.list" @mail-sent="updateMails"
    @close-compose="toggleCompose"/>
    </section>
       
    `,
    data() {
        return {
            mails: null,
            isCompose: false,
            ComposeMsg: '',
            list: 'inbox',
        }
    },
    methods: {
        toggleCompose() {
            this.isCompose = !this.isCompose
            // this.ComposeMsg = this.ComposeMsg === '' ? 'Close '  : ''
        },
        updateMails(payload) {
            this.toggleCompose()

            mailService.getMail(payload.res.id)
                .then(res => {
                    this.mails.unshift(payload.res)
                    this.showMail(payload.list)
                    this.mails.sort(this.sort(a, b))
                })

        },
        sort(a, b) {
            a['sentAt'] - b['sentAt']
        },
        filterBy() {
            // switch (val) {
            //     case 'txt':

            this.mails = mailService.filterBy()
            //         break
            // }
        },
        // filterByTxt() {
        //     this.mails = mailService.filterByTxt()
        // },
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
            this.mails.sort(this.sort(a, b))

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
                this.mails.sort(this.sort(a, b))
            }
            )

        this.setParams()
    },
    components: {
        MailList,
        MailFilter,
        MailCompose,
        // eventBusService,
    },
    emits: [],
}