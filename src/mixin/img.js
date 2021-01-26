export default {
	data(){
		return{
            imgIf:false,
		}
    },
    created(){

    },
    methods:{
        load(){
            this.imgIf = true
        },
        error(){
            this.imgIf = false;
        }
    },
    mounted(){
    	
    },
    props: { 
        src: {//按钮内容
            type: String,
            default: ''
        },
        id: {//按钮内容
            type: String,
            default: 'app'
        },
       
    }
  }
