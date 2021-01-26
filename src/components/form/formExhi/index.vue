<style lang="scss" scoped>
@import '~scss';
.formExhi{
  @include bjc;
  border-bottom:1px solid #f3f4f7;
  *{
    display:black
  }
  padding:0.373333rem 0;
  background-color:#fff;
}
.vertical{
  background-color:#fff;
  border-bottom:1px solid #f3f4f7;
  *{
    display:black
  }
  padding:0.266667rem 0;
}
.bable{
  font-size: 0.373333rem;
  color:#333;
  width: 1.413333rem;
}
.vertical-bable{
	font-size: 0.373333rem;
  color:#333;
}
.val{
  
  text-align: right;
}
.valLeft,.val{
  margin-left:0.266667rem;
  font-size: 0.373333rem;
  color:#b6b9c2;
  flex:1;
  word-wrap:break-word;
}
.verticalVal{
  font-size: 0.373333rem;
  color:#333;
  margin-top:0.266667rem;
  flex:1

}
.correct{
    
   
}
.ExhiSub .val,.ExhiSub .verticalVal{
   color:#333;
}

.errprBo{
  border-color:#e60b29;
}

</style>    
<template>
    <li class="formExhi ExhiSub"  v-if="type =='left'">
      <span class="bable" :style="{width:width}">{{babel}}</span>
      <div class="valLeft" :style="contStyle"><slot></slot></div>
  </li>
  <li class="vertical ExhiSub clom"  v-else-if="type=='vertical'">
       <span class="vertical-bable">{{babel}}</span>
      <div class="verticalVal"><slot></slot></div>
  </li>
  <li class="formExhi ExhiSub"  v-else>
      <span class="bable" :style="{width:width}">{{babel}}</span>
      <div class="val" ><slot></slot></div>
  </li>
  
</template>
<script>
import { mapActions } from 'vuex';
import forms from 'mixins/form'
    export default {
          mixins:[forms],
          props: {
            width:{//宽度
                type: String,
                default: ''
            },
            babel: {//展示字段
                type: String,
                default: ''
            },
            type:{
               type:String
            },
            contStyle:{
              type:Object,
              default:function(){
                 return {}
              }
            }
          } 
    }
</script>