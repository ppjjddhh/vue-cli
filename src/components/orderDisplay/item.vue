<style lang="scss" scoped>
@import '~scss';
.bjc{
   @include bjc(flex-start); 
}
.orderDisplay-li{
    padding:0 0.533333rem;
    background: #fff;
}
.orderDisplay{

	*{
	  display:block;
	}
	padding:0.16rem 0;
}
.bable{
	font-size: 0.373333rem;
	color:#999;
	width:3.28rem;
}
.val{
    @include SurplusWidth(100%,3.28rem);
	font-size: 0.373333rem;
	color:#999;
	word-wrap:break-word;
}
.bjc .val{
    
}
.vertical .val{
    margin-top:0.266667rem;
}
</style>    
<template>
	<li class="orderDisplay-li">
        <div :class="type!=='vertical'?'bjc':'vertical'" class="orderDisplay">
            <span class="bable" :style="babelStyle">{{babel}}</span>
      <div class="val"><slot></slot></div>
        </div>
      
	</li>
</template>
<script>
import { mapActions } from 'vuex';
    export default {
        provide:{
            form:'',
            
        },
        data(){
    		return{
    			babelStyle:{
                    width:''
                }
    		}
        }, 
        methods:{
            
        },
        mounted(){
          var width = this.$parent.width;
          this.$set(this.babelStyle,'width',width);
        },
        props: { 
            babel: {//展示字段
                type: String,
                default: ''
            },
            type:{
               type:String
            },
            width:{
               type:String
            }
              
        
        }
    }
</script>