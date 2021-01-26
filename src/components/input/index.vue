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
    flex:1
}
.center{
    flex:1;
    padding-bottom: 0.07rem;
    text-align: inherit;
    color:#333;
    // min-width:100%;
}
.icoClose{
    width:0.533333rem;
    color:#c8c9d0;
    text-align: center;
    padding-left:0.266667rem;
}
.visibility{
    display: none
}
</style>    
<template>
   <div class="input-index">
     <input type="text" v-model.trim="text" @input="input" :placeholder="title" class="center" autocomplete="off" :style="inputClass">
     <i class="icoClose components"  @click="deleteValue" v-if="deleteIf" :class="text||'visibility'">&#xe601;</i>
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
            },
            inputClass:{
              type:Object,
              default:function(){
                return {}
              }
            }   
        }
    }
</script>