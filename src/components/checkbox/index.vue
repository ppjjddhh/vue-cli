<style lang="scss" scoped>
@import '~scss';

</style>    
<template>
 <ul >
    <slot></slot>
</ul>
</template>
<script>

    export default {
        inject:{form: { default: false }},
        data(){
      		return{
               itemNum:0,
               itemObe:{},
               checkbox:[],  
      		}
        }, 
        watch:{
          value(o){
            if(!o.length){
              this.input([]); 
            }
            //this.click()
             return o;
          }
        },
        methods:{
            unValue(){
              this.input([]);
             },
            input(o){
               if(this.form){
                  this.$parent.verification(o);
               }
                
            },
            click(e){
                let _this = this,checkbox = _this.checkbox;
                if(e.checked){
                  checkbox.push(e.id);
                }else{
                  checkbox.splice(checkbox.indexOf(e.id),1)
                }
                _this.input(checkbox);
                _this.$emit('input',checkbox);
            },
            addItem(id){
               this.itemObe[id] = this.itemNum++;
            },
            unChecked(){
              this.checkbox = [];
               this.$children.forEach((o)=>{
                o.unChecked();
              })
            },
            // init(){
            //   let _this = this;
            //   if(typeof _this.value !== 'undefined'){
            //    _this.value.forEach((val)=>{
            //      let num = _this.itemObe[val]
            //       !isNaN(num)&&_this.$children[num].addChecked();
            //    })
                
            //   }
            // }
        },
        mounted(){
            //this.init()
        },
        props:{
          value:{
            type:Array,
            default:function(){
              return []
            }
          }
        },   
        
    }
</script>