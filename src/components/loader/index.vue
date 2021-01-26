<style lang="scss" scoped>
@import '~scss';

.tip{
	z-index:99999;
	width:100%;
	height:100%;
	@include bpadkJ(center);

}

.loading-img{
	width:0.88rem;
	height:0.88rem;
	animation: spin 800ms infinite linear;
	
}
@keyframes spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.loader{
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    /* width: 100%; */
    /* height: 100%; */
    transform: translate(-50%,-50%);
}

.loaderShow-enter-active, .loaderShow-leave-active {
  transition: opacity .5s;
}
.loaderShow-enter, .loaderShow-leave-to  {
  opacity: 0;
}
.loads{
	position: absolute;
	top:0;
	left:0;
	z-index:99999;
	width:100%;
	height:100%;
	@include bpadkJ(center);
}
.load-bj{
	position: absolute;
	top:0;
	left:0;
	z-index:1;
	width:100%;
	height:100%;
	background-color:#f3f4f7;
	opacity: .9;
}
</style>    
<template>
   <transition name="loaderShow">

	<div class="loads" v-show="loaderIf">
        <div class="load-bj" ></div>
		<div class="loader">
				<img :src="path"  class="loading-img block" />
				<!-- <i class="ico fz38">&#xe699;</i> -->
			</div>
	</div>
	</transition>
</template>
<script>

 import { mapActions,mapState } from 'vuex'
    export default {
	    name:'v-loader',
		 data(){
			 return{
			   path:require('../images/icon_load@2x.png'),
			   showIf:false,
			   time:''
			 }
		 },
	 mounted(){
		 
	 },
	 
    computed: mapState({loaderIf:state => state.loaderIf}),
        props: {
           
        }
    }
</script>