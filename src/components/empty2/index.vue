<style lang="scss" scoped>
@import '~scss';
.searchs{
  padding:2.2rem 0;
}
  .emptyValue{
    @include flex;
    background-color:#fff;
    img{
      margin:0 auto 0.133333rem auto;
      width:2.666667rem;
      height:2.666667rem;
      display:block;
    }
    .emptyValue-content{
      text-align: center;
      color:#b6b9c2;
    }
 }
</style>
<template >
  <article class="clom searchs" v-if="emptyIf">
      <div class="emptyValue" >
         <img src="../images/pic_search_no@3x.png">
         <p class="emptyValue-content fz28">{{value}}</p>
      </div>
  </article>
    
</template>
<script> 
    import {mapState } from 'vuex'
    export default {
    data(){
      return{
        imgPath:require('../images/pic_search_no@3x.png'),
      }
    
    },
     mounted(){
       
    },
    methods: {
        
    },
   props: { 
     value:{
      type: String,
        default: '无信息'
     },
    emptyIf: {//是否显示
        type: Boolean,
        default: ''
    }
           
        }
    }
    
</script>