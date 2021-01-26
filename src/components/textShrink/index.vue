<style lang="scss" scoped>
@import '~scss';
@import '../css/base.css';
.textShrink{
    position: relative;
}
 .textShrink-val{
    font-size: 0.373333rem;
    line-height: 0.533333rem;
    transition: height .5s;
    overflow: hidden;
    color:#666;
 }
 .textTitle{
    font-size: 0.32rem;
    color: $navBorderC;
    margin-top:0.133333rem;
    @include bpadkJ(flex-end);
 }
 .title-val{
    @include bpadkJ(flex-end);
 }
 .textShrink-ico{
  margin-left: 0.133333rem;

  transition: all .3s;
 }
 .shrink .textShrink-val,.open .op{
   @include lineClamp(2);
   white-space: normal;
 }
 .open .textShrink-ico{
        transform: rotate(-180deg);
 }
 .op{
   position: absolute;
   top:0;
   left:0;
   opacity: 0;
   height:1px;
   overflow: auto;
   width:100%;
   font-size: 0.373333rem;
   line-height: 0.533333rem;
 }
 .open .title-val:before{
   content:'收缩'
 }
 .shrink .title-val:before{
   content:'展开'
 }
 .components{
  font-size: 0.266667rem;
 }
</style>    
<template>	
    <div class="textShrink" :class="open?'open':'shrink'">
        <div class="op" v-if="opIf" ref="op">{{text | trim}}</div>
        <p class="textShrink-val" ref="val" :style="val_style">{{text | trim}}</p>
        <div class="textTitle">
            <span @click="click" class="title-val" :style="titleStyle"><i class="textShrink-ico components">&#xe65e;</i>
        </span>
        </div>
    </div>
</template>
<script>

    export default {

        data(){
    		return{
               val_style:{
                 height:'auto'
               },
               valClass:'valHeight',
               open:'',
               opIf:true,
               opHeight:'',
               valHeight:''
    		}
        },
        methods:{
           click(){
            
             var _this = this,height='';
             _this.open = !_this.open;
             _this.$emit('click',_this.open);
             
             if(_this.valClass === 'valHeight'){
                _this.valClass = 'opHeight';
                height = _this.opHeight;
             }else{
                _this.valClass = 'valHeight';
                height = _this.valHeight;
             }
             _this.addHeight(height)
           },
           addHeight(o){
             this.$set(this.val_style,'height',`${o}px`)
           },
           init(){
            var _this = this,refs=_this.$refs;
           _this.$nextTick(()=>{
             _this.opHeight = refs.op.scrollHeight;
             _this.valHeight = refs.val.offsetHeight;
             _this.open = _this.opHeight<_this.valHeight;
             _this.addHeight(_this.valHeight);
             _this.opIf = false;

           })
           }

        },
        mounted(){
          this.init()
            
        },
        watch:{
          text(o){
          }
        },
        props:{
            titleStyle:{
              type:Object
            },
            text: {//数据
               type: String,
              default:''
            },
            IfOpen:{
                type: Boolean,
                default: false
            }
        },   
        
    }
</script>