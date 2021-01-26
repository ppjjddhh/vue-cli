<style lang="scss" scoped>
@import '~scss';
.textLoad{
	color:#999;
	font-size: 0.32rem;
	@include bpadkJ(center);
	background-color: #fff;
}
.text1{
	animation:text 2.6s  0s infinite;
	display: block;
}
.text2{
	animation:text 2.6s  0.4s infinite;
	display: block;
	margin-left: 0.08rem;
}
.text3{
	animation:text 2.6s  0.8s infinite;
	display: block;
	margin-left: 0.08rem;
}
.text4{
	animation:text 2.6s  1.2s infinite;
	display: block;
	margin-left: 0.08rem;
}
.text5{
	animation:text 2.6s  1.6s infinite;
	display: block;
	margin-left: 0.08rem;
}
.text6{
	animation:text 2.6s  2s infinite;
	display: block;
	margin-left: 0.08rem;
}
.text7{
	animation:text 2.6s  2.4s infinite;
	display: block;
	margin-left: 0.08rem;
}
@keyframes text{
	10%{
	    transform: translateY(-50%);
	}
	20%{
		transform: translateY(0);
	}
}
</style>    
<template>
   <transition>
	<div class="textLoad" v-if="openIf">
        <span class="text1">.</span>
        <span class="text2">.</span>
        <span class="text3">.</span>
        <span class="text4">正</span>
        <span class="text5">在</span>
        <span class="text6">加</span>
        <span class="text7">载</span>
	</div>
	</transition>
</template>
<script>

    export default {
		 data(){
			 return{
			 
			 }
		 },
	 mounted(){
		 
	 },
	 props: {
            openIf:{
              type:Boolean,
              default:true
            }  
           
        },
    }
</script>