export default {
    template:`
    <section class="note-main-header">
       <div class="logo-button-container"> <button>☰</button>
    <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" >
    <h1>Keep</h1>
</div> 
   
    <input type="text" v-model="txt" placeholder="search">
   </section>`,
    data(){
        return {
            txt:""
        }
    },

    created(){

    },
    methods:{

    },computed:{

    },

}