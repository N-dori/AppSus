// בס"ד

import MailPreview from '../cmps/MailPreview.js'

export default {
    props: ['mails'],
    template: `
    <section>
    <h1>hi from list</h1>

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