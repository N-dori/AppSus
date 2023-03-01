// בס"ד

import { mailService } from '../services/mail.service.js'
// import { storageService } from '../../../services/async-storage.service.js'

import MailList from '../cmps/MailList.js'
import MailFilter from '../cmps/MailFilter.js'
import MailCompose from '../cmps/MailCompose.js'

export default {
    props: [],
    template: `
        <MailFilter />

        <button @click="toggleCompose"><span>{{ ComposeMsg }}</span>Compose</button>

        <section>
            <MailList v-if="mails" :mails="mails"/>
        </section>

        <MailCompose v-if="isCompose"  @mail-sent="updateMails"/>
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
            this.ComposeMsg = this.ComposeMsg === '' ? 'Close ' : ''
        },
        updateMails(res) {
            this.toggleCompose()

            mailService.getMail(res.id)
                .then(res => this.mails.push(res))
        },
    },
    computed: {
    },
    created() {
        mailService.createDemoMails()
        mailService.getMails()
            .then(res => this.mails = res)
    },
    components: {
        MailList,
        MailFilter,
        MailCompose,
    },
    emits: [],
}