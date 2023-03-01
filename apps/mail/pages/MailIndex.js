// בס"ד

import { mailService } from '../services/mail.service.js'

import MailList from '../cmps/MailList.js'

export default {
    props: [],
    template: `
    <section>
    <h1>hi from index</h1>
        <MailList v-if="mails" />
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
    },
    emits: [],
}