export default {
    props: [],
    template: `
    <div class="color-paleta">
<div @click="setColor('#804674')"  class="color-paleta-item item1"></div>
<div  @click="setColor('#A86464')" class="color-paleta-item item2"></div>
<div  @click="setColor('#B3E5BE')"  class="color-paleta-item item3"></div>
<div @click="setColor('#F5FFC9')"  class="color-paleta-item item4"></div>
<div  @click="setColor('#FAF7F0')" class="color-paleta-item item5"></div>
</div>
    `,
    data() {
        return {

        }
    },
    methods: {
        setColor(color){
            this.$emit('colorChanged',color)
        }
    },
    computed: {
    },
    created() {
    },
    components: {
    },
    emits: ['colorChanged'],
}