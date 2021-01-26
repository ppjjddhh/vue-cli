<style lang="scss" scoped>
@import '~scss';
.codesub{
    color:#3096fb;
}
.code-nosub{
    color:#b6b9c2;
}
.code{
    width:2.666667rem;
    text-align: center;
    border-left:1px solid #f4f4f7;
    font-size: 0.373333rem;
}
</style>    
<template>
        <div class="code" @click="button" :class="codeIf?'codesub':'code-nosub'">{{codeName}}</div>

</template>
<script>
import { mapActions } from 'vuex';
import {verifying} from 'base';
    export default {

    data(){
		return{
			codeName:'发送验证码',
            codeIf:true
  		}
    }, 
    methods:{
	    button(){
            if(!this.codeIf){
                return;
            }
            var obj = verifying.phone(this.phone);
            if(!obj.result){

              this.$store.commit('setPromptClose',{promptTipIf:true,promptTip:obj.message})
              return;
            }

                 this.$emit('click',this.phone);
                  this.codeIf = false;
                  let time = 60;
                  this.codeName = `剩余${time}s`;
                 this.valtime = setInterval(()=>{
                   if(time>1){
                     time--;
                     this.codeName = `剩余${time}s`
                    }else{
                    clearInterval(this.valtime);
                    this.valtime = '';
                      this.codeName = '发送验证码';
                      this.codeIf = true;
                    }
                 },1000)
        },
    },
    mounted(){
	    

    },
        props: { 
            phone: {//按钮内容
                type: String,
                default: ''
            }
           
        }
    }
</script>