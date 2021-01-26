<style lang="scss" scoped>
@import '../scss/common.scss';
.addSex{
    position: absolute;
    bottom:0;
    left:0;
    right:0;
    background-color:$backgroundColor2;
  }
  .sexName{
    height:1.453333rem;
    line-height:1.453333rem;
    border-bottom:1px solid $borderColor4;
    background-color:$backgroundColor2;
    text-align: center;

  }
  .sexType{
  color:$navBorderC;
}
</style>    
<template>
	   <v-bj @bjTap="bjTap" v-if="sexIf">
		 <ul class="fz28 addSex" v-tap.stop="{methods:addSex}" >
             <li dataType="0" class="sexName" :class="sex==0?'sexType':''">男</li>
             <li dataType="1" class="sexName" :class="sex==1?'sexType':''">女</li>
         </ul>
	   </v-bj>
	
</template>
<script>
import { mapActions } from 'vuex';
import store from '../store/';

    export default {
    data(){
		return{
			sexIf:false,
		}
    },
    methods:{
        open(){
          this.sexIf = true;
        },
	    bjTap(){
		    this.sexIf = false;
	    },
        addSex(o){//添加性别
          this.sexIf = false;
          var e = o.event.target;
          var sex = e.getAttribute('dataType');
          this.$emit('getSex',sex);
        },

    },
    mounted(){
	    

    },
        props: { 
            sex: {//按钮内容
                type: String,
                default: ''
            }
           
        }
    }
</script>