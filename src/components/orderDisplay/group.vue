<style lang="scss" scoped>
@import '~scss';

.Ogulp-li-bottom li:last-child{
  border-bottom:0px
}

.Ogulp-li{
   //margin-bottom: 0.266667rem ;
   background-color:#fff;
   border-bottom:1px solid #f0f0f0;
   padding-top:0.533333rem
}
.Ogulp-babel{
  padding:0 0.533333rem 0.16rem 0.533333rem;
  background: #fff;
  font-size: 0.373333rem;
  color:#999
}
.Ogulp-padding{
  padding:0.053333rem 0
}
</style>    
<template>
  <li class="Ogulp-li" >
      <div v-if="babels" class="Ogulp-babel">{{babels}}</div>
      <ul class="Ogulp" :class="!babels&&'Ogulp-padding'">
        <slot></slot>
      </ul>
  </li>
</template>
<script>
import { mapActions } from 'vuex';
    export default {
        data(){
          return {
             width:this.$parent.width
          }
        },
        mounted(){
          
        },
        methods:{
          
        },
        props: { 
            babels: {//展示字段
                type: String,
                default: ''
            },
            types: {//展示字段
                type: String,
                default: ''
            },

        }
         
    }
</script>