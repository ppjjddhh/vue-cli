<style lang="scss" scoped>
@import '~scss';
.tip{
	position:fixed;
	top:0;
	left:0;
	z-index:9999;
	width:100%;
	height:100%;
	@include box;
	@include justify-content;
	@include box-align;
}
.tip-content{
	border-radius:0.8rem;
	margin:auto;
	max-width:80%;
	min-width:3.2rem;
	padding:0.2rem 0.333333rem;
    text-align: center;
    word-wrap: break-word;
    font-size: 14px;
}
.type2{
	background-color:#ffe2de;
	color:$errorTipColor;	
}

.btns_close{
	margin-right:0.933333rem;
}
</style>    
<template>
	<div class="tip"  @click="errorClose" v-if="errorTipIf" >
	   <p class="tip-content type2" >
	       {{errorTip}}		
	   </p>
	</div>
</template>
<script>
import { mapActions,mapState } from 'vuex';

    export default {
     name:'v-errorTip',
      data(){
       return {
       }
      },
    methods:{
     errorClose(){
	     this.$store.commit("setErrorClose",{result:false,tip:this.errorTip})
     }
    },
    computed: mapState({ errorTip: state => state.error_content,
    errorTipIf:state => state.errorTipIf}),

    }
</script>