// בס"ד

import { eventBusService } from "../../../services/event-bus.service.js"
export default {
    props: ['info'],
    template: `
    <p>{{info.title}}</p>
    <p>{{info.body}}</p>
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
    },
    emits: [],
}