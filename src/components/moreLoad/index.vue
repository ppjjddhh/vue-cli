<style lang="scss" scoped>
@import '~scss';

@-webkit-keyframes rotation{
from {-webkit-transform: rotate(0deg);}
to {-webkit-transform: rotate(360deg);}
}
@keyframes rotation{
	from {-webkit-transform: rotate(0deg);}
	to {-webkit-transform: rotate(360deg);}
}
.brush-loading{
	width:0.426667rem;
	height:0.426667rem;
	-webkit-transform: rotate(360deg);
	transform: rotate(360deg);
	animation: rotation 1s linear infinite;
	-moz-animation: rotation 1s linear infinite;
	-webkit-animation: rotation 1s linear infinite;
	-o-animation: rotation 1s linear infinite;
	background:url('../images/icon_load_brush@2x.png') no-repeat left top;
	background-size:100% 100%;
}
.brush{
	@include bpadkJ(center);
	color:$color3;
	height:1.066667rem;
	line-height:1.066667rem;
	// border-top:1px solid $borderColor4;
	position: relative;
	

}
.brushImg{
	@include bpadkJ(center);
	color:$color3;
    position: absolute;
    left:0;
	right:0;
}
.brush-content{
	margin-left:0.266667rem;
	font-size: 0.293333rem;
	color:#ccc;

}
.ifMoreN{
	position: absolute;
	@include bpadkJ(center);
	color:$color3;
	font-size: 0.293333rem;
	left:0;
	right:0;
}
</style>    
<template>
	<div class="brush fz28">
			<div  class="brushImg" :style="ifMore==='y'?'':'visibility:hidden'" v-if="ifMore==='y'">
			<div class="brush-loading"></div>
			<!-- <img src="~images/icon_load_brush@2x.png"  class=" block" /> -->
			<span class="block brush-content">正在载入</span>
			</div>
			<span :style="ifMore==='n'?'':'visibility:hidden'" class="ifMoreN">已经到底啦！</span>		
	   </div>
	</div>
</template>
<script>

 import { mapActions,mapState } from 'vuex'
    export default {

	 data(){
		 return{
			path:require('../images/icon_load_brush@2x.png')
		 }
	 },
    computed: mapState({ load: state => state.user.load}),
        props: { 
            ifMore: {//是否还有更多y:有;n：没有
                type: String,
                default: ''
            }
           
        }
    }
</script>