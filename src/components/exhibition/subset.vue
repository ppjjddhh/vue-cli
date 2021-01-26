<style lang="scss" scoped>
@import '~scss';
.bjc{
   @include bjc; 
}
.subset{
	background-color: #fcfdff;
	*{
	  display:black
	}
	padding:0.266667rem 0.4rem;
}
.bable{
	font-size: 0.373333rem;
	color:#333;
	width:3.28rem;
}
.val{
    @include SurplusWidth(100%,3.28rem);
	font-size: 0.373333rem;
	color:#999;
	word-wrap:break-word;
    text-align: right;
}
.bjc .val{
    margin-left:0.266667rem;
}
.vertical .val{
    margin-top:0.266667rem;
}
</style>    
<template>
	<li class="subset" :class="type!=='vertical'?'bjc':'vertical'">
      <span class="bable">{{babel}}</span>
      <div class="val"><slot></slot></div>
	</li>
</template>
<script>
import { mapActions } from 'vuex';
    export default {
        provide:{
            form:''
        },
        data(){
    		return{
    			
    		}
        }, 
        methods:{
            
        },
        mounted(){
           
        },
        props: { 
            babel: {//展示字段
                type: String,
                default: ''
            },
            type:{
               type:String
            }
              
        
        }
    }
</script>