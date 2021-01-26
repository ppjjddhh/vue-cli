<style lang="scss" scoped>
@import '~scss';
.formItem{
    @include bjc;
  border-bottom:1px solid #f3f4f7;
  *{
    display:black
  }
  padding:0.373333rem 0.2rem;
  background-color:#fff;
  font-size: 0.426667rem;
}
.correct{
    border-bottom:1px solid #eaeaea;
    color:#333;
}
.error{
    border-bottom:1px solid #e60b29;
    *{color:#e60b29;}
}
</style>    
<template>
  <li class="formItem correct">
      <slot></slot>
  </li>  
</template>
<script>
import { mapActions } from 'vuex';
import {verifying} from 'base';
import forms from 'mixins/form'
    export default {
          mixins:[forms]
        
    }
</script>