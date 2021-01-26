<style lang="scss" scoped>
@import '~scss';
.bj{
    position: fixed;
    top:0;
    left:0;
    right:0;
    height:100%;
    z-index:99; 
    background-color:rgba(0,0,0,.7)
}
.val{
  position: absolute;
  left:0;
  right:0;
  background-color:#fff;
  font-size: 0.373333rem;
  li{
    text-align: center;
    padding:0.4rem 0;
    border-bottom:1px solid #eaeaea;
  }
}
.selected{
  color:#3f84df;
}
.input-index{
    @include bpadkJ;
    flex:1
}
.icoClose{
    width:0.533333rem;
    color:#c8c9d0;
    text-align: center;
    padding:0 0.266667rem;
}
.select{
  width:100%;
}
.titleColor{
  color:#b6b9c2
}
.op{
  animation:mymove .3s ;
  animation-fill-mode:forwards;
}
@keyframes mymove{
   from{
     bottom:-100%;
   }
   to{
      bottom:0;
   }
}
</style>    
<template>
   <div class="select">
     <slot></slot>
   </div>
    
</template>
<script>
    export default {
        inject:{form: { default: false }},
        value(o){
          if(typeof o == 'undefined'||o===''){
            this.input('')
          }
            
            this.click(o)
            
             return o;
          },
        data(){
        return{
             
          }
        }, 

        methods:{
           input(o){
               if(this.form){
                  this.$parent.verification(o);
               }
                
            },

           click(o){
             this.$emit('input',o);
             this.$emit('click',o);
             this.input(o)
           },
           unValue(){
            this.input('')
           },
           unChecked(){
                this.input('')
               this.$children.forEach((o)=>{
                o.unChecked();
               })
            },
            init(){
              
            }
        },
        mounted(){

        },
        props: {
            value:{
              default:''
            },
            selectId:{
               type:String,
               default:''
            },
            name:{
               type:String,
               default:''
            },
            type:{//对比类型
               type:String,
                default:'id'
            },

           
        },

        
    }
</script>