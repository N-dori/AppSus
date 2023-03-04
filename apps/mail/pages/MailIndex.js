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
        <li><button @click ="showMail(inbox)">inbox</button></li>
        <li @click ="showMail(sent)"><button>sent</button></li>
        <li @click ="showMail(trash)"><button>trash</button></li>
    </ul>
    </section>



    <MailList @mails-update="reboot" v-if="mails" :mails="mails"/>


    <MailCompose v-if="isCompose"  @mail-sent="updateMails"
    @close-compose="toggleCompose"/>
    </section>
       
    `,
    data() {
        return {
            mails: null,
            isCompose: false,
            ComposeMsg: '',
        }
    },
    methods: {
        toggleCompose() {
            this.isCompose = !this.isCompose
            // this.ComposeMsg = this.ComposeMsg === '' ? 'Close '  : ''
        },
        updateMails(res) {
            this.toggleCompose()

            mailService.getMail(res.id)
                .then(res => this.mails.push(res))
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

    },
    computed: {
    },
    created() {
        mailService.createDemoMails()
        mailService.getMails()
            .then(res => this.mails = res)

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