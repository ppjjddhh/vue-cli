<style lang="scss" scoped>
@import '~scss';
.checkbox{

  

}
.checkbox input[type='checkbox']{
  position: absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  opacity: 0;
  z-index: 2;
}
.checkbox input[type='checkbox']:checked + .checkLaber{

  border-color:#76c155;

}
.checkLaber{
   width:0.373333rem;
  height:0.373333rem;
  border:1px solid #d9dade;
  position: relative;
  @include bpadkJ(center);
  transition: all .1s ease;
  border-radius:2px;
}
.checkbox input[type='checkbox'] +.checkLaber:before{
   opacity: 0;
   color:#76c155;
   content:"";
   transition: all .2s ease;
   width:0.2rem;
   height:0.093333rem;
   transform:rotate(-45deg) translateX(-50%);
   opacity: 0;
   border-bottom:1px solid #76c155;
   border-left:1px solid #76c155;
   display: block;
   position: absolute;
       left: 0.16rem;
    top: 0.026667rem;
}
.checkbox input[type='checkbox']:checked +.checkLaber:before{
  opacity: 1;
}
.checkboxItem{
    @include balin(center);
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
 <li class="checkboxItem">
    <div class="checkbox">
         <input type="checkbox" class="" @change="click"  :name="name" ref="checkbox">
         <span class="checkLaber iconfont"></span>
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
                this.$refs.checkbox.checked = true
            },
            unChecked(){
                this.$refs.checkbox.checked = false
            }
        },
        mounted(){
             this.$parent.addItem(this.id); 
        },
        props:['id','name'],   
        
    }
</script>