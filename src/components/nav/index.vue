<style lang="scss" scoped>
@import '~scss';
.navItems{
    display:flex;
}
.nav-bootom{
    transition:all .3s;
    height:2px;
    background-color:#3191de;
    position: absolute;
    bottom:0;
    left:0;
    border-radius:0.08rem;
}
.nav{
  background-color:#fff;
  border-bottom:2px solid #f3f4f7;
}
.navList{
  position: relative;
}
</style>    
<template>  
    <nav class="nav">
      <div class="navList" ref="nav">
        <ul class="navItems fz28" >
          <slot></slot>
        </ul>
        <div class="nav-bootom" :style="style"></div>
      </div>
    </nav>
</template>
<script>
    export default {
    name:'v-nav',
        data(){
        return{
               style:{
                 transform:'translateX(0)',
                 width:0,
               },
               translateX:0,
               num:0,
               numObj:{},
               numItemWidth:0
          }
        }, 
        watch:{
          value(o){
             let _this=this,num = _this.numObj[o];
             _this.setStyle(num);
              //_this.setItemClass(num);
            return o;
          }
        },
        methods:{
          setNumObj(id){
            this.numObj[id] = this.num++;
          },
         setItemClass(num){
           this.$children.forEach((list,i)=>{
               //list.selects = num===i?'navSelected':'';
               list.$set(list.style,'width',this.numItemWidth+'px')
           })
         },
          click(o){
            let _this=this,num = _this.numObj[o.id];
              _this.$emit('input',o.id);
              _this.setStyle(num);
              //_this.setItemClass(num);
          },
          setStyle(num){
              let _this = this,transform = `translateX(${_this.translateX+_this.numItemWidth*num}px)`;
             this.$set(_this.style,'transform',transform);
          }
        },
        mounted(){
            let _this = this,offsetWidth = _this.$refs.nav.offsetWidth;
             let width = this.bootomWidth || offsetWidth/10;
             _this.numItemWidth = offsetWidth/_this.itemNum;
            _this.translateX = offsetWidth/_this.itemNum/2-width/2;
            _this.$set(_this.style,'width',`${width}px`);
            _this.setItemClass();
            this.setStyle(0);

        },
        props: {
            bootomWidth:{
              type:[Number,String]
            },
            value:{
                type:[Number,String],
            },
            itemNum: {//子元素个数
                type: [Number,String],
                default: 4
            },  
           
        },

        
    }
</script>