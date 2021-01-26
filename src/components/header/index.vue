<style lang="scss" scoped>
@import '~scss';

.headers{
  padding:0 0.4rem;
  position: relative;
 @include bpadkJ;
 // border-bottom: 1px solid #eaeaea;
 background-color:#fff;
 height:1.173333rem;
}
.fz44{
  font-size: 0.586667rem;
}
.left{ 
  position: absolute;
  @include balin;
  left:0;
  top:0;
  bottom:0;
  width:1.066667rem;
  &>*:first-child{
    padding-left:0.4rem;

  }
}
.header{
    @include bpadkJ(center);
    width:100%;
    @include flex;
}
.header-other{
  position: absolute;
  right:0.4rem;
  top:0;
  bottom:0;
  @include balin;
  min-width:0.586667rem;
  &>*{
    height:100%;
    @include box;
     @include box-align;
     min-width:100%;
  }
}
.fz32{
  font-size: 0.426667rem;
}
</style>    
<template>
	<header class="headers fz44" >
    <div class="left"><slot name="left"></slot></div>
   <div class="header fz32">
    		<slot></slot>
    </div> 
    <div class="header-other">
        <slot name="right"></slot>
    </div>  
	</header>

</template>
<script>
 import { mapActions,mapState } from 'vuex'
 import {primordialFun} from 'base'
    export default {
      data(){
        return{
          headerIf:true
       }
    },
    created(){
      this.headerIf = !primordialFun.isWeiXin
    },
    methods:{
      title(){
          
      }
    },
    computed: mapState({collectionIf: state => state.user.collectionIf,moreValues:function(){return this.moreValue.split(',')}}),
        
    }
</script>