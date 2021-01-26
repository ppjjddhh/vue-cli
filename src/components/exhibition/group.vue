<style lang="scss" scoped>
@import '~scss';

.Egulp-li-bottom li:last-child{
  border-bottom:0px
}

.Egulp-li{
   margin-bottom: 0.266667rem ;
   background-color:#fff;
}
.Egulp-babel{
  padding:0.32rem 0.4rem;
  background: #fff;
  font-size: 0.373333rem;
}
</style>    
<template>
  <li class="Egulp-li">
      <div v-if="babel" class="Egulp-babel">{{babel}}</div>
      <ul class="Egulp">
        <slot></slot>
      </ul>
  </li>
</template>
<script>
import { mapActions } from 'vuex';
    export default {
        data(){
          return {
 
          }
        },
        methods:{
          
        },
        props: { 
          babel:{
            type: String,
            default: ''
          }
              
        }
    }
</script>