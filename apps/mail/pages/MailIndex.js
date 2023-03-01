// בס"ד

import {storageService} from ''

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

    },
    components: {
        MailList,
    },
    emits: [],
}