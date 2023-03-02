// בס"ד

import { mailService } from '../services/mail.service.js'


export default {
    props: [],
    template: `
        <input v-if="criteria" v-model="criteria.txt" @input="search" type="text" placeholder="Search"> |
        <select @change ="isRead($event.target.value)">
            <option value="all">
                All
            </option>
            <option value="read">
                Read
            </option>
            <option value="unread">
                Unread
            </option>
        </select>
    `,
    data() {
        return {
            criteria: null,
        }
    },
    methods: {
        search() {
            // console.log('this.criteria', this.criteria)
            this.$emit('filter', this.criteria)
        },
        isRead(val) {
            switch (val) {
                case 'all': this.criteria.isRead = undefined
                    break
                case 'read': this.criteria.isRead = true
                    break
                case 'unread': this.criteria.isRead = false
                    break
            }

            this.$emit('filter', this.criteria)
        },
    },
    computed: {
    },
    created() {
        mailService.createDemoCriteria()
        mailService.getCriteria()
            .then(res => this.criteria = res)
    },
    components: {
    },
    emits: [
        'filter',
    ],
}