<style lang="scss" scoped>
@import '~scss';
.radioItem{
  position: relative;
  padding: 0.24rem 0.133333rem;
}
.radio{
  
  margin-right:0.266667rem;
}
.radioItem input[type='radio']{
  position: absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  opacity: 0;
  border-radius:50%;
  z-index: 2;
}
.radioItem input[type='radio'] + .radio .checkLaber{
   width:0.4rem;
   height:0.4rem;
   @include bpadkJ(center);
   border-radius:100%;
   border:1px solid #d9dad4;
}
.radioItem input[type='radio']:checked + .radio .checkLaber{
  border-color:#3ac57b;
}
.radioItem input[type='radio']:checked + .radio .checkLaber::after{
  content:'';
  width:0.186667rem;
  height:0.186667rem;
  border-radius:100%;
  background-color:#3ac57b;
}
.radioItem{
  @include bpadkJ(flex-start)
}
.radio-title{
  width:calc(100% - 1.333333rem);
}
.checked{
  background-color: #f3f4f7;
}
</style>    
<template>
   <div class="radioItem">
     <input type="radio" class="input"  :name="name" :id="id" v-model="checked" :value="id" ref="radio" >
      <div class="radio">
          <div class="checkLaber"></div>
      </div>
       
       <label class="radio-title"><slot></slot></label>
       
   </div>
    
</template>
<script>
    export default {
        data(){
        return{
            name:'',
            checked:'',
            checkIf:''
          }
        },
        watch:{
          checked(o){
              this.$parent.click(this.id);
            
            return o 
          }
        },
        methods:{
          addChecked(){
                this.$refs.radio.checked = true
            },
            unChecked(){
                this.$refs.radio.checked = false
            },
           change(o){
            this.checkIf = o.target.checked;
               if(o.target.checked){
                 this.$parent.click(this.id);
               }
               
           },
        },
        mounted(){
          this.name = this.$parent.name;         
          this.checked = this.$parent.selectId;
          if(this.$parent.selectId === this.$props[this.$parent.type]){
                this.$parent.click(this.id);
          }  
        },
        props: {
            id:{
                default:''
            },
            value:{
              type:String,
                default:''
            },
            
        },

        
    }
</script>