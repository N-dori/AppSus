// בס"ד

import { mailService } from '../services/mail.service.js'


export default {
    props: [],
    template: `
    <form>
        <input type="text" placeholder="Search"> |
        <label>Read</label>
        <input type="checkbox">
        <label>Unread</label>
        <input type="checkbox">
    </form>
    `,
    data() {
        return {
            criteria: null,
        }
    },
    methods: {
    },
    computed: {
    },
    created() {
        mailService.createDemoCriteria()
        this.criteria = mailService.getCriteria()
    },
    components: {
    },
    emits: [],
}