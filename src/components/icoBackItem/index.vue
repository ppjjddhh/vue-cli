<style lang="scss" scoped>
@import '~scss';
.ico-back{
      height:100%;
    @include box;
    @include box-align;
    width:100%;
}
</style>    
<template>
  <i class="iconfont" v-if=" type=='add' ">&#xe64e;</i>
  <i class="iconfont ico-back" @click="fallBack" v-else>&#xe650;</i>
</template>
<script>
import { mapActions } from 'vuex';
import { primordialFun } from 'base';
    export default {
    data(){
	    return{
	    }
    },
    methods:{
	    fallBack(){
      var ifBack = true;
        if(typeof this.backs === 'function'){
          ifBack = this.backs();
        }
        if(ifBack){
          this.goBacks();
        }  
      },
      goBacks(){
      this.$store.commit('goBackIf',true);
       var paths = this.$store.state.pathArray;
          if(paths.length === 1){
            paths = [];
             primordialFun.closeView();
             return;
          }else{
            let url = paths[paths.length-2];
            paths.pop();
            //sessionStorage.setItem('paths',JSON.stringify(paths));
            this.$router.replace(url)
          }
          this.$store.commit('setPathArray',paths);
            //history.back();
            //window.history.go(-1);
           
          
        }
    },
    mounted(){
    },
    props: { 
      backs:{
      },
      type:{
               type:String,
               default:'back'
            },
    }
  }
</script>