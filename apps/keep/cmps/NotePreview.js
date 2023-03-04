
// בס"ד

import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import { eventBusService } from "../../../services/event-bus.service.js"
import { integrationService } from '../../../services/integration.service.js'

export default {
    props: ['note'],
    template: `

<div :style="{backgroundColor:this.note.style.backgroundColor}"> 
   <Component 
            :is="note.type"  
            :info="note.info" />
            <button @click="remove(note.id)">Close</button>
            <button @click="toMail">To mail</button>
                </div>

    `,
    data() {
        return {

        }
    },
    created() {
      //  console.log('note preview',this.note );
        

    },
    methods: {
        remove(noteId) {
            eventBusService.emit('removeNote', noteId)
        },
        toMail() {
            let mail = integrationService.fromNoteToMail(this.note)
            let subject = mail.subject
            let body = mail.body
            // console.log('subject.body', subject, body)
            // eventBusService.emit('open-compose')

            this.$router.push('/mail/true/' + subject + '/' + body)
        },

    }, computed: {

    },
    components: {
        NoteTxt,
        NoteImg,
        integrationService,
    },
    emits: []

}