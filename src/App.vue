<style lang="css" scoped>
.slide-left-enter-active{
  position: absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  z-index:2;
  animation:fadeInLeft .5s;
  -webkit-backface-visibility:hidden;
-webkit-perspective:1000;
}
.slide-left-leave-active{
  position: absolute;
  top:0;
  left:0;
  z-index:1;
  width:100%;
  height:100%;
  animation:fadeInLeftleave .5s;
  -webkit-backface-visibility:hidden;
-webkit-perspective:1000;
}
.slide-right-leave-active{
  position: absolute;
  top:0;
  left:0;
  z-index:1;
  width:100%;
  height:100%;
  animation:fadeInRightleave .5s;
  -webkit-backface-visibility:hidden;
-webkit-perspective:1000;
}

@keyframes fadeInRightleave{
   from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(-100%, 0, 0);
    }
}
@keyframes fadeInLeftleave{
  from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(100%, 0, 0);
    }
}
@keyframes fadeInLeft {
    from {
        transform: translate3d(-100%, 0, 0);
    }
    to {
        transform: none;
    }
}
.slide-right-enter-active{
  position: absolute;
  left:0;
  top:0;
  z-index:2;
   width:100%;
  height:100%;
  animation:fadeInRight .5s;
  -webkit-backface-visibility:hidden;
-webkit-perspective:1000;
}
@keyframes fadeInRight{
  from {
        transform: translate3d(100%, 0, 0);
    }
    to {
        transform: none;
    }
}
.app{
      position: relative;
      overflow-x: hidden;
      height:100%;
      background:#f3f4f7;
}
</style>
<template  >
  
  <div  :style="style" class="app">
    <!-- <transition :name="transitionName"> -->
     <keep-alive :include="/^keep-/">
      <router-view >
      </router-view> 
     </keep-alive>
     <!-- </transition> -->
     <!-- <div v-show="loader"> -->
       <v-loader ></v-loader>
     <!-- </div> --> 
     <v-promptTip></v-promptTip>
     <v-errorTip></v-errorTip>

</div>

</template>

<script>
import {primordialFun} from 'base';
const BODYHETGHT = document.documentElement;
export default {
  name: 'App',
  data(){
     return {
     transitionName:'in',
     loader:true,
     style:{
       height:`${BODYHETGHT.clientHeight}px`
     },
    }
  },
  created(){
  

  },
  watch: {
      '$route' ({ meta, fullPath,params,path}, from) {
          // var primordialFun = primordialFun;
          // alert(primordialFun.isiOS)
          // if(primordialFun.isiOS){
            
          //    if(parseInt(this.style.height)!=BODYHETGHT.clientHeight){
          //   this.$set(this.style,'height',`${BODYHETGHT.clientHeight}px`)
          // }
          // }
          
           let title = meta.title||'';
           let docm = document;
           docm.title = title;
         if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
            var i = docm.createElement('iframe');
            i.src = '/favicon.ico';
            i.style.display = 'none';
            i.onload = function() {
                setTimeout(function(){
                    i.remove();
                }, 9)
            }
            docm.body.appendChild(i);
          }
       
        
        // this.loader = false;
        // var transitionName = '';

        //  let paths = this.$store.state.pathArray,path = paths.slice(0),BackIf = this.$store.state.BackIf;
        //  var len = paths.length;
        //  var reload = sessionStorage.getItem('reloadview');
        //  if(this.$store.state.pushIf || !len || reload ||(this.$store.state.replaceIf&&!BackIf)){
        //   transitionName = 'slide-right'
        // }else{
        //   transitionName = 'slide-left'
        // }
        //  if(len!=0){
        //   this.transitionName = transitionName;
        //    setTimeout(()=>{
        //    this.loader = true;
        //   },400)
        //  }else{
        //    this.loader = true;
        //  }
        // if (this.$store.state.pushIf || !len) {
        //     this.$store.commit('setPushIf',false);
            
        //     //this.$store.state.push = false;
        //     paths.push(fullPath);
        // } else if (this.$store.state.replaceIf || reload) {
        //     //store.state.replace = false;
        //     this.$store.commit('setReplaceIf',false);
        //     paths.push[len - 1] = fullPath;
        // } else {
        //     paths.pop();
        // }


        // this.$store.commit('goBackIf',false);
        // sessionStorage.setItem('reloadview', '');
         // if(path.indexOf(to.path)===-1){
         //    path.push(to.path);
         //    this.transitionName = 'slide-right'
         // }else if(path[path.length-2]=== to.path){
         //   this.transitionName = 'slide-left';
         //   path.pop();
         // }
         // this.$store.commit('setPathArray',paths);
      }
  },
}
</script>

