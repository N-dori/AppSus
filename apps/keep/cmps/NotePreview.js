
// בס"ד
import { svgService } from "../../../services/svg.service.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import { eventBusService } from "../../../services/event-bus.service.js"
import { integrationService } from '../../../services/integration.service.js'

export default {
    props: ['note'],
    template: `
<section :style="{backgroundColor:this.note.style.backgroundColor}">
<div @click="openModal"> 
   <Component 
            :is="note.type"  
            :info="note.info" />
        </div>
        <div class="preview-svg-container">
        <div @click="toMail"><div  v-html="setSvg('mail')"></div></div>
        <div @click="remove(note.id)"><div  v-html="setSvg('trash')"></div></div>
        </div>
</section>
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
        },openModal(){
        
       eventBusService.emit('onOpenModal',this.note)
        },
        toMail() {
            let mail = integrationService.fromNoteToMail(this.note)
            let subject = mail.subject
            let body = mail.body
            // console.log('subject.body', subject, body)
            // eventBusService.emit('open-compose')

            this.$router.push('/mail/true/' + subject + '/' + body)
        },setSvg(type){
            if(type==='mail')return svgService.getNoteSvg('mail')
            if(type==='trash')return svgService.getNoteSvg('trash')
        }

    }, computed: {

    },
    components: {
        NoteTxt,
        NoteImg,
        integrationService,
    },
    emits: ['onOpenModal']

}