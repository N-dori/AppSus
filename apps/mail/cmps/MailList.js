// בס"ד

import MailPreview from '../cmps/MailPreview.js'

export default {
    props: [],
    template: `
    <section>
    <h1>hi from list</h1>

        <ul>
            <li>
                <MailPreview />
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