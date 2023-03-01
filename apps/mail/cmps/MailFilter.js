// בס"ד

import { mailService } from '../services/mail.service.js'


export default {
    props: [],
    template: `
    <form>
        <input @input"updateTxt" type="text" placeholder="Search"> |
        <label>Read</label>
        <input @click ="" type="checkbox">
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
        updateTxt(){
            
        }
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