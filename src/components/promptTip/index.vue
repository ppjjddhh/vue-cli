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
	border-radius:0.106667rem;
	margin:auto;
	max-width:80%;
	min-width:3.2rem;
	padding:0.2rem 0.333333rem;
    text-align: center;
    word-wrap: break-word;
    font-size: 14px;
}
.type2{
	background-color:rgba(0,0,0,.7);
	color:#fff;	
}

.btns_close{
	margin-right:0.933333rem;
}
</style>    
<template>
	<div class="tip"  v-if="prompt.promptTipIf" @click="promptClose">
	   <p class="tip-content type2" >
	       {{prompt.promptTip}}		
	   </p>
	</div>
</template>
<script>
import { mapActions,mapState } from 'vuex';

    export default {
      data(){
       return {
       }
      },
    methods:{
     promptClose(){
	     this.$store.commit("setPromptClose",{promptTipIf:false,promptTip:this.promptTip})
     }
    },
    computed: mapState({ prompt: state => state.promptTip,
    }),

    }
</script>