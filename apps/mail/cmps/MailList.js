// בס"ד

import { mailService } from '../services/mail.service.js'

import MailPreview from '../cmps/MailPreview.js'

export default {
    props: ['mails'],
    template: `
    <section class="mail-list-container">
        <ul class="mail-list">
            <li class="mail-preview" v-for="mail in mails">
                <MailPreview @mail-deleted="updateMails" :mail="mail"/>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        updateMails() {
            mailService.getMails()
                .then(res => {
                    console.log('hi lis');

                    this.$emit('mails-update')})
        },
    },
    computed: {
    },
    created() {
    },
    components: {
        MailPreview,

    },
    emits: ['mails-update'],
}