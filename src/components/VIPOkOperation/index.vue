<style lang="scss" scoped>
@import '~scss';
@import 'ltivew/src/styles/1px.scss';
.VIPOkOperation{
	position: absolute;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
	width: 8.0rem;
	box-sizing: border-box;
	background-color: #fff;
	z-index: 2;
	border-radius: 0.08rem;
	text-align: center;
}
.VIPOkTip{
	position: absolute;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
    z-index: 3
}
.bj{
	background-color: rgba(0,0,0,.7);
	width: 100%;
	height: 100%;
}
.ok{
	margin: 0 auto;
	font-size: 0.96rem;

}
.VIPOkOp-title{
	font-size: 0.48rem;
    font-weight: 600;
	text-align: center;
}
.VIPOkOp-val{
	padding:0.533333rem;
	@include LTivew-1px-b(#f0f0f0);
}
.VIPOkOp-con{
	margin-top: 0.213333rem;
	color:#999;
	font-size: 0.346667rem;
	text-align: center;
}
.VIPOkOp-btns{
	height: 1.146667rem;
	@include bpadkJ;
	border-bottom-left-radius:0.08rem;
	border-bottom-right-radius:0.08rem;
}
.btns{
	flex:1;
	font-size: 0.426667rem;
}
.leftbtn{
	color:#666;
}
.rightbtn{
	color:#3fb755
}
</style>    
<template>
    <article class="VIPOkTip" v-show="show">
       <div class="bj" @touchmove="touchmove"></div>
	   <div class="VIPOkOperation">
         <div class="VIPOkOp-val">
         	 <h2 class="VIPOkOp-title">{{title}}</h2>
         	 <p class="VIPOkOp-con">{{tip}}</p>
         </div>
         <div class="VIPOkOp-btns">
         	<button class="btns leftbtn" @click="leftBtn">{{leftCont}}</button>
         	<button class="btns rightbtn" @click="rightBtn">{{rightCont}}</button>
         </div>
	   </div>
	</article>
</template>
<script>
import { mapActions } from 'vuex';

    export default {
	    data(){
	    	return {
	    		show:false,
	    	
	    	}
	    },
	    methods:{
	    	leftBtn(){
	    		this.leftFun();

	    	},
	    	rightBtn(){
	    		this.rightFun();
	    	},
	       touchmove(){
	            window.event.preventDefault()
	        },
	    },
	    props: {
	    	rightCont:{
	         	type:String,
	         	default:'是'
	         }, 
	    	leftCont:{
	         	type:String,
	         	default:'否'
	         }, 
	    	tip:{
	         	type:String,
	         	default:'你确定要取消订单?'
	         }, 
	         title:{
	         	type:String,
	         	default:'取消订单'
	         }, 
	         leftFun:{
	         	type:Function
	         },
	         rightFun:{
	         	type:Function
	         }
	    }
    }
</script>