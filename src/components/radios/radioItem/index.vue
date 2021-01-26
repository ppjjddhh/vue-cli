 <style lang="scss" scoped>
@import '~scss';
.radio{
  
}
.radio input[type='radio']{
  position: absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  opacity: 0;
  border-radius:50%;
  z-index: 2;
}
.radio input[type='radio']:checked + .checkLaber{

  border-color:#76c155;

}
.checkLaber{
   width:18px;
  height:18px;
  border-radius: 50%;
  border:1px solid #d9dade;
  position: relative;
  @include bpadkJ(center);
  transition: all .1s ease;
}
.radio input[type='radio'] +.checkLaber:before{
   width:10px;
   height:10px;
   transform: translate(-50%,-50%);
   opacity: 0;
   border-radius:100%;
   display: block;
   position: absolute;
   left: 50%;
    top: 50%;
   background-color:#76c155;
   content:'';
   transition: all .1s ease;
}
.radio input[type='radio']:checked +.checkLaber:before{
  opacity: 1;
}
.radioItem{
    display:flex;
    position: relative;
}
.label{
    font-size: 0.373333rem;
    margin-left:0.266667rem;
    color:#999;
    flex:1;

}
</style>    
<template>
 <li class="radioItem">
    <div class="radio">
         <input type="radio" class="" @change="click"  :name="name" ref="radio">
         <span class="checkLaber"></span>
    </div>
    <label class="label">
        <slot></slot>
    </label>
</li>
</template>
<script>

    export default {
        data(){
      		return{
              checked:false,
      		}
        }, 
        methods:{
            click(e){
                let checked = e.currentTarget.checked;
                this.$parent.click({
                    id:this.id,
                    checked:checked
                });
            },
            addChecked(){
                this.$refs.radio.checked = true
            },
            unChecked(){
                this.$refs.radio.checked = false
            }
        },
        mounted(){
             this.$parent.addItem(this.id); 
        },
        props:['id','name'],   
        
    }
</script>