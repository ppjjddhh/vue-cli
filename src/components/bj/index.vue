<style lang="scss" scoped>
@import '~scss';
.bj{
    position: absolute;
    top:0;
    left:0;
    right:0;
    height:100%;
    z-index:999; 
}
.bj1{
    background-color:rgba(0,0,0,0.5);
    position: absolute;
    top:0;
    left:0;
    right:0;
    height:100%;
}
</style>    
<template>
	
	<div class="bj"  @touchmove="touchmove">
        <div class="bj1" @click="bjTap"></div>
        <div @touchmove.stop="a">
            <slot></slot>
        </div>
		
	</div>
	
</template>
<script>
import { mapActions } from 'vuex';
    export default {
    name:'v-bj',
    data(){
		return{
			
		}
    }, 
    methods:{
        a(){},
        touchmove(){
            window.event.preventDefault()
        },
	    bjTap(){
		    this.$emit('bjTap');
	    }
    },
    mounted(){
	    

    },
        props: { 
            content: {//按钮内容
                type: String,
                default: ''
            }
           
        }
    }
</script>