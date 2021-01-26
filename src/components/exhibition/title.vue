<style lang="scss" scoped>
@import '~scss';
.bjc{
   @include bpadkJ; 
}
.exhibitionTitle{
	background: #fff;
	*{
	  display:block;
	}
	padding:0.32rem 0.4rem;
}
.title-bable{
	font-size: 0.373333rem;
	color:#333;
	flex:1
}

.bjc .val{
    margin-left:0.266667rem;
}
.vertical .val{
    margin-top:0.266667rem;
}
</style>    
<template>
	<li class="exhibitionTitle" :class="type!=='vertical'?'bjc':'vertical'">
      <div class="title-bable">{{babel}}</div>
      <div ><slot></slot></div>
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