<style lang="scss" scoped>
@import '~scss';
.title{
  font-size: 0.346667rem;
  padding: 0.8rem 0 0.4rem 0;
}
.gulp-li-bottom li:last-child{
  border-bottom:0px
}
.gulp-li-bottom{
  border-bottom:1px solid #eaeaea;
}
.gulp-li{
  margin-top:0.266667rem;
}
</style>    
<template>
  <li class="gulp-li">
      <ul class="gulp">
        <slot></slot>
      </ul>
  </li>
</template>
<script>
import { mapActions } from 'vuex';
    export default {
        provide:{
            group:true
        },
        data(){
          return {
 
          }
        },
        methods:{
          verificationValue(){
             return this.$parent.verificationValue;
          },
          verification(o){
             this.$parent.verification(o);
          },
          rulesObject(){
            return this.$parent.rulesObject;
          }
        },
        props: { 
            title: {//展示字段
                type: String,
                default: ''
            },
              
        }
    }
</script>