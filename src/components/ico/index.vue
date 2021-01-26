<style lang="scss" scoped>
@import '~scss';
</style>
<template>
	<i class="iconfont" @click="click"><slot></slot></i>
</template>
<script>

    export default {
    name:'v-ico',
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
