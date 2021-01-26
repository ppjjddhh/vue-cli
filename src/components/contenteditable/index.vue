<style lang="scss" scoped>
@import '~scss';
@import '../css/base.css';
.placeholder {
  color:#b6b9c2;
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  z-index:1;

}
.inputs{
  position: relative;
  left:0;
  right:0;
  top:0;
  bottom:0;
  z-index:2;
}
.input-index{
    position: relative;
}
.center{
    width: calc(100% - 1.1rem);
    user-select:text;
}
.icoClose{
    width:0.533333rem;
    color:#c8c9d0;
    text-align: center;
    padding:0 0.266667rem;
    position: absolute;
    top:50%;
    right:0;
    transform: translateY(-50%)
}
.visibility{
    visibility: hidden;
}
</style>    
<template>
   <div class="input-index clearfix">
    <div class="inputs">
     <div type="text" style="-webkit-user-select:text" @input="input"  class="center needsclick"  contenteditable="true" ref="cont"  @focus="focus" @blur="blur"></div>
     <i class="icoClose components" v-if="deleteIf" @click="deleteValue" :class="placeholderIf?'visibility':''">&#xe692;</i>
    </div>
     <span class="placeholder" v-show="titleIf">{{title}}</span>
   </div >
  
</template>
<script>
import { mapActions } from 'vuex';
    export default {
        inject:{form: { default: false }},
       
        data(){
        return{
          text:'',
          placeholderIf:false,
          titleIf:true,
        }
        }, 
        methods:{
            input(){
             var val = this.$refs.cont.innerHTML,result = false;
             val = val.replace(/<[^>]+>/g,"");
             val = val.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
             val = val.replace(/&nbsp;/gi,'');
             val = val.replace(/^\s+|\s+$/g,"");
             this.text = val;
             if(this.form){
               result = this.$parent.verification(val);
             }
              this.$emit('input',val);
             
              if(val!==''){
                this.placeholderIf = false;
                this.titleIf = false;
              }else{
                this.placeholderIf = true;
                this.titleIf = true;
              }
            },
            deleteValue(){
            
                this.$refs.cont.innerHTML = '';
                this.titleIf = true;
                this.input();
                this.$refs.cont.focus();
            },
            focus(){
              //this.$emit('focus');
            },
            blur(){
                //this.$emit('blur');

                if(this.text===''){
                 this.titleIf = true;
                }
            }
        },
        mounted(){
           if(this.value!==''){
              this.$refs.cont.innerHTML = this.value;
              this.input();
           }else{
             this.placeholderIf = true;
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