<style lang="scss" scoped>
@import '~scss';
.bjc{
   @include bjc; 
}
.exhibition{
	
	border-bottom:1px solid #f3f4f7;
	*{
	  display:black
	}
	padding:0.266667rem 0;
}
.bable{
	font-size: 14px;
	color:#999;
	flex:1;
}
.val{
    
	width:6.346667rem;
	font-size: 14px;
	color:#333;
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
	<div class="exhibition" :class="type!=='vertical'?'bjc':'vertical'">
      <span class="bable">{{babel}}</span>
      <div class="val"><slot></slot></div>
	</div>
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