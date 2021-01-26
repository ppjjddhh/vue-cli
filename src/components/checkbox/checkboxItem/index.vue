<style lang="scss" scoped>
@import '~scss';
.radio{

  

}
.checkboxItem input[type='checkbox']{
  position: absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  opacity: 0;
  z-index: 2;
}
.radio input[type='radio']:checked + .checkLaber{

  border-color:$navBorderC;

}
.checkLaber{
  width:18px;
  height:18px;
  border:1px solid #d9dade;
  position: relative;
  @include bpadkJ(center);
  margin-top:0.066667rem; 
}

.checkboxItem input[type='checkbox']:checked +.label{
  color:#fff;
  background-color:$navBorderC;
  border-color:transparent;
}
.checkboxItem{
    position: relative;
    display: inline-flex;
    margin:0.4rem 0.266667rem 0 0;
}
.label{
    font-size: 0.373333rem;
     padding:0.106667rem 0.4rem;
     border-radius:0.48rem;
     color:#999;
     transition: all .1s ease;
     display: inline-block;
     border:1px solid #d9dade;
}
</style>    
<template>
 <li class="checkboxItem">
    <input type="checkbox"  :name="name" ref="checkbox" :value="id" v-model="checkboxs">
    <label class="label">
        <slot></slot>
    </label>
</li>
</template>
<script>

    export default {
         watch:{
           checkboxs(o){
             this.$parent.click({
                    id:this.id,
                    checked:o
              });
             return o
           }
         },
        data(){
    		return{
               checked:false,
               checkboxs:''
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
                //this.$refs.checkbox.checked = false;
                this.checkboxs = ''
            }
        },
        mounted(){
             this.$parent.addItem(this.id); 
        },
        props:['id','name'],   
        
    }
</script>