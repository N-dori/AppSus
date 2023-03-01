// בס"ד

import { eventBus } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

export default {
    props: [],
    template: `
    <h1>hi from details</h1>
    <pre v-if="mail">{{ mail }}</pre>
    `,
    data() {
        return {
            mailId: null,
            mail: null,
        }
    },
    methods: {

    },
    computed: {
    },
    created() {

        // mailService.getMail(this.mailId)
        //     .then(res => this.mail = res)
    },
    components: {
    },
    emits: [],
}