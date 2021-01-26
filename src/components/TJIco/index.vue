<style lang="scss" scoped>
@import '~scss';
</style>    
<template>	
	<i class="TJiconfont" @click="click"><slot></slot></i>
</template>
<script>

    export default {
    name:'v-TJiconfont',
    data(){
		return{
            
		}
    }, 
    methods:{
        click(){
            this.$emit('click')
        }
    },
    mounted(){
	   

    },
        props: { 
           
           
        }
    }
</script>