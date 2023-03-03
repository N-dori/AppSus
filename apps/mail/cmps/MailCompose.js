// בס"ד

import { mailService } from "../services/mail.service.js"

export default {
    props: [],
    template: `
    <section class="compose-container">
        <h3>New Message</h3>

        <p>From: Your-Mail (user@appsus.com)</p>
        
        <form class="compose-form" @submit.prevent="send">
            <input v-model="to" type="text" placeholder="To">
            <input v-model="subject" type="text" placeholder="Subject">
            <textarea v-model="body" rows="10" cols="50"></textarea>
            <button>Send</button>
        </form>
        
    </section>
    `,
    data() {
        return {
            to: null,
            subject: null,
            body: null,
        }
    },
    methods: {
        send() {
            mailService.send(this.to, this.subject, this.body)
                .then(res => {
                    this.$emit('mail-sent', res)
                })
        }
    },
    computed: {
    },
    created() {
    },
    components: {
    },
    emits: ['mail-sent'],
}