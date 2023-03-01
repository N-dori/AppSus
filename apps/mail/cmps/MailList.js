// בס"ד

import MailPreview from '../cmps/MailPreview.js'

export default {
    props: ['mails'],
    template: `
    <section>
        <ul>
            <li v-for="mail in mails">
                <MailPreview :mail="mail"/>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
    created() {
    },
    components: {
        MailPreview,
    },
    emits: [],
}