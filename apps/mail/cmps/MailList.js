// בס"ד

import { mailService } from '../services/mail.service.js'

import MailPreview from '../cmps/MailPreview.js'

export default {
    props: ['mails', 'list'],
    template: `
    <section class="mail-list-container">
        <ul class="mail-list">
            <li class="mail-preview" v-for="mail in mails">
                <MailPreview v-if="mail" @mail-deleted="updateMails" :mail="mail"/>
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
                    this.$emit('mails-update', this.list)
                })
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