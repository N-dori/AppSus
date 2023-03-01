// בס"ד

import { mailService } from '../services/mail.service.js'

import MailList from '../cmps/MailList.js'
import MailFilter from '../cmps/MailFilter.js'

export default {
    props: [],
    template: `
        <MailFilter />

        <section>
            <MailList v-if="mails" :mails="mails"/>
        </section>
    `,
    data() {
        return {
            mails: null,
        }
    },
    methods: {
    },
    computed: {
    },
    created() {
        mailService.createDemoMails()
        this.mails = mailService.getMails()
    },
    components: {
        MailList,
        MailFilter,
    },
    emits: [],
}