<style lang="scss" scoped>
@import '~scss';
.content{
    @include SurplusWidth(100%,1.173333rem);
}
</style>    
<template>
	<aside class="content">
		<slot></slot>
	</aside>
</template>
<script>
    export default {
        data(){
    		return{
    			
    		}
        }, 
        methods:{
    	    
        },
        mounted(){
    	    

        },
        props: { 
            
        }
    }
</script>