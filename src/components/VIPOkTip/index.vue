<style lang="scss" scoped>
@import '~scss';
.VIPOkTip-con{
	position: absolute;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
	padding:0.4rem;
	width: 3.733333rem;
	box-sizing: border-box;
	background-color: #000;
	z-index: 2;
	border-radius: 0.08rem;
	color:#fff;
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
.title{
	font-size: 0.346667rem;
	margin: 0.133333rem auto 0;
}
.title2{
	margin-top: 0.106667rem;
	font-size: 0.293333rem;
}
</style>    
<template>
    <article class="VIPOkTip" v-show="show">
       <div class="bj" @touchmove="touchmove"></div>
	   <div class="VIPOkTip-con">
           <div class="ok">
           	 <v-ico>&#xe6c7;</v-ico>
           </div>
           <p class="title">{{title}}</p>
           <p class="title2" v-if="title2">{{title2}}</p>
	   </div>
	</article>
</template>
<script>
import { mapActions } from 'vuex';

    export default {
    data(){
    	return {
    		show:false,
    		title:'',
    		title2:''
    	}
    },
    methods:{
       touchmove(){
            window.event.preventDefault()
        },
    },
        props: { 
            
        }
    }
</script>