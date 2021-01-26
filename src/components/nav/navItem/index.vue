<style lang="scss" scoped>
@import '~scss';
.navItem{
    padding:0.32rem 0;
    text-align: center;
    color:#666;
    transition:color .3s;
    font-size: 0.373333rem;
}
.navSelected{
    color:#3291de
}
</style>    
<template>	
    <li class="navItem"  :class="{'navSelected':$parent.value === id}" :style="style" @click="click">
        <slot></slot>
    </li>
</template>
<script>

    export default {

        data(){
    		return{
                numItem:0,
                itemId:'',
                selects:'',
                style:{
                    width:''
                }
    		}
        }, 
        methods:{
            click(){   
                this.$parent.click({
                    id:this.itemId,        
                });
            }
        },
        mounted(){
            let _this = this,parent = _this.$parent;
             //_this.$set(_this.style,'width',document.body.offsetWidth/2+'px')
             parent.setNumObj(_this.id);
            _this.itemId = _this.id;
            if(parent.value == _this.itemId){
                setTimeout(()=>{
                    _this.click();
                },0)
                
            }
           
        },
        props:['id'],   
        
    }
</script>