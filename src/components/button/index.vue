<style lang="scss" scoped>
@import '~scss';
.button{
    width:9.333333rem;
    height:1.173333rem;
    line-height:1.173333rem;
    text-align: center;
    border-radius:0.106667rem;
    font-size: 0.426667rem;
    border-radius:0.56rem;
    transition:all .3s;
}
.sub{
  background-color: $navBorderC;
  color:#fff;
}
.op{
    background-color: #eaeaea;
    color:#999;
}
.bts{
  text-align: center;
  background-color:#fff;
  padding:0.133333rem 0;
}

.form{
  height:100%;
}
.form-vals>li{
   padding-left: 0.266667rem;
   padding-right: 0.266667rem;
}
.form-vals{
  flex:1;
}

</style>    
<template>
	
      <div class="bts" :style="btsStyle">
         <button class="button" :class="!buttonIf?'op':'sub'" @click="click">{{buttons}}</button>
      </div>

	
</template>
<script>
    export default {
        watch:{
         
        },
        provide:{
            form:true
        },
        data(){
      		return{
      			
 
      		}
        }, 
        methods:{
            click(){
              this.$emit('click')
            }
          },
        init(){
             
        },
        created(){
        
           
        },
        props: {
            buttonIf:{//提交样式
               type: Boolean,
               default:true
            },
            btsStyle:{//提交样式
               type: Object,
               default: function(){
                  return {}
               }
            },
            buttons:{
              type:String,
              default:'提交'
            }
                 
        }
    }
</script>