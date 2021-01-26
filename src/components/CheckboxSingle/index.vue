<style lang="scss" scoped>
@import '~scss';

.CheckboxSingle{
  position: relative;
  border-bottom:1px solid #f0f0f0;
  padding: 0.266667rem 0.4rem;
  background-color: #fff;
  font-size: 0.4rem;
  height: 1.2rem;
  @include bpadkJ;
  left:0;
  right:0;
  top:0;
  width:100%;
}
.CheckboxSingle-checkbox input[type='checkbox']{
  position: absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  opacity: 0;
  z-index: 2;
}
.CheckboxSingle-checkbox input[type='checkbox']:checked + .checkLaberss{

  border-color:$navBorderC;

}
.checkLaberss{
  width:0.373333rem;
  height:0.373333rem;
  border:1px solid $navBorderC;
  position: relative;
  @include bpadkJ(center);
  transition: all .1s;
  border-radius:2px;
}
.CheckboxSingle-checkbox input[type='checkbox'] +.checkLaberss:before{
   opacity: 0;
   color:#76c155;
   content:"";
   transition: all .2s ease;
   width:0.2rem;
   height:0.093333rem;
   transform:rotate(-45deg) translateX(-50%);
   opacity: 0;
   border-bottom:1px solid $navBorderC;
   border-left:1px solid $navBorderC;
   display: block;
   position: absolute;
     left: 0.16rem;
    top: 0.026667rem;
}
.CheckboxSingle-checkbox input[type='checkbox']:checked +.checkLaberss:before{
  opacity: 1;
}
</style>    
<template>
   <div  class="CheckboxSingle">
      <slot></slot>
      <div class="CheckboxSingle-checkbox">
             <input type="checkbox" class=""   v-model="checkboxs" ref="checkbox">
             <span class="checkLaberss"></span>
      </div>

     </div>
    
</template>
<script>
    export default {
        inject:{form: { default: false }},
        watch:{
          checkboxs(o){
             this.input(o);
            return o 
          },
 
        },
        data(){
        return{
             checkboxs:false,
          }
        }, 

        methods:{
           getNumber(o){
              return o - 0;
           },
           switchType(o){
             var value = ''
             switch(this.outType){
              case 'boolean':
                value = o;
                break;
              case 'number':
                value = this.getNumber(o);
                break;
             }
             return value
           },
           input(o){
               if(this.form){
                  this.$parent.verification(o);
               }
              this.$emit('input',this.switchType(o));
            },
        },
        mounted(){
           this.checkboxs = this.defaultValue;
        },
        props: { 
            defaultValue:{
                type:Boolean,
                default:false
            },
            value:{
                default:false
            },
            outType:{
               type:String,
               default:'boolean'
            }
        },

        
    }
</script>