<style lang="scss" scoped>
@import '~scss';
.bjc{
   @include bjc; 
}
.exhibition-li{
    padding:0 0.4rem;
    background: #fff;
}
.exhibition{
	
	border-bottom:1px solid #f3f4f7;
	*{
	  display:block;
	}
	padding:0.32rem 0;
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
	<li class="exhibition-li">
        <div :class="type!=='vertical'?'bjc':'vertical'" class="exhibition">
            <span class="bable">{{babel}}</span>
      <div class="val"><slot></slot></div>
        </div>
      
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