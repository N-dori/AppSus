// בס"ד

import { storageService } from '../../../services/async-storage.service.js'
import { mailService } from '../services/mail.service.js'


export default {
    props: [],
    template: `
    <section class="filter">
        <input v-if="criteria" v-model="criteria.txt" @input="search" type="text" placeholder="Search">
        <section>
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
        <select @change ="isStar($event.target.value)">
            <option value="all">
                All
            </option>
            <option value="star">
                Stared
            </option>
            <option value="noStar">
                No-star
            </option>
        </select>  
        </section> 
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
            this.$emit('filter', 'isRead')
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
        isStar(val) {
            switch (val) {
                case 'all': this.criteria.isStared = undefined
                    break
                case 'star': this.criteria.isStared = true
                    break
                case 'noStar': this.criteria.isStared = false
                    break
            }

            mailService.saveCriteria(this.criteria)

            this.$emit('filter', 'isStar')
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