<style lang="scss" scoped>
@import '~scss';
@import '../css/base.css';
::-webkit-input-placeholder { /* WebKit browsers */
    color:    #b6b9c2;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #b6b9c2;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #b6b9c2;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #b6b9c2;
}
.input-index{
    @include bpadkJ;
    flex:1;
    height:100%;
}
.center{
    flex:1;
    padding-bottom: 0.07rem;
    height:100%;
}
.icoClose{
    width:0.533333rem;
    color:#c8c9d0;
    text-align: center;
    padding:0 0.266667rem;
}
.visibility{
    visibility: hidden;
}
</style>    
<template>
   <div class="input-index">
     <textarea type="text" v-model="text" @input="input" :placeholder="title" class="center" autocomplete="off" ></textarea>
     <i class="icoClose components" v-if="deleteIf" @click="deleteValue" :class="text===''||typeof text === 'undefined'?'visibility':''">&#xe601;</i>
   </div >
	
</template>
<script>
import { mapActions } from 'vuex';
    export default {
        inject:{form: { default: false }},
        watch:{
         value(o){
          this.text = o;
          return o;
         }
        },
        data(){
    		return{
    			text:''
    		}
        }, 
        methods:{
            input(){
             if(this.form){
               this.$parent.verification(this.text);
             }

                this.$emit('input',this.text);
            },
            deleteValue(){
                this.text = '';
                this.input();
            },
            blur(){
                this.$emit('blur');
            }
        },
        mounted(){
           this.text = this.value;
           if(this.text!==''){
              this.input();
           }
        },
        props: { 
            value:{
                type:[String,Number],
                default:''
            },
            title:{
               type:String,
                default:''
            },
            deleteIf:{
                type:Boolean,
                default:true
            }   
        }
    }
</script>