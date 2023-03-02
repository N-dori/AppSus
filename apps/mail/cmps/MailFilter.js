// בס"ד

import { storageService } from '../../../services/async-storage.service.js'
import { mailService } from '../services/mail.service.js'


export default {
    props: [],
    template: `
    <section class="filter">
<input v-if="criteria" v-model="criteria.txt" @input="search" type="text" placeholder="Search"> 
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
    </section>
       
    `,
    data() {
        return {
            criteria: null,
        }
    },
    methods: {
        search() {
            mailService.saveCriteria(this.criteria)
            this.$emit('filter')
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

            mailService.saveCriteria(this.criteria)

            this.$emit('filter', 'isRead')
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