<style lang="scss" scoped>
@import '~scss';
.imgError{
        width:100%;
        height:100%;
        border-radius:0.106667rem;
        @include img('../images/head_my.png','../images/head_my@2x.png','../images/head_my@3x.png');
        background-repeat: no-repeat;
        background-position:top left;
        background-size:100% 100%;
        border-radius:50%;
    }
    img{
        width:100%;
        height:100%;
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        z-index:1;
        border-radius:50%;
    }
    .imgs{
    width:100%;
    height:100%;
        position: relative;
    }
    .icos-fz{
    font-size: 1.28rem;
    }
</style>    
<template>
    <div class="imgs">
		<img   @load="load" @error="error" v-lazy="src">
	    <div  class="imgError" v-if="!imgIf">
	       
	    </div>
    </div>
</template>
<script>
    import img from 'mixins/img.js'
    export default {
        mixins:[img]
    }
</script>