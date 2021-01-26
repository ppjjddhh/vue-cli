<style lang="scss" scoped>
@import '~scss';
@import '../css/base.css';
.title{
  height:1.333333rem;
  @include bpadkJ;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
  font-size: 0.373333rem;
}
.title-tip{
  color:#333;
}
.shrink-op{
  position: absolute;
  top:0;
  left:0;
  opacity: 0;
}
.shrink-val,.shrink-ico{
  transition: all .6s;
}
.shrink-ico{
  color:#999;
}
.shrink-val{
  overflow: hidden;
  // padding-top: 0.266667rem;
}
.open{
  transform: rotate(-180deg);
}
.loadText{
  margin-top: 0.266667rem;
}
.shrink-load{
  overflow: scroll;
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: height .3s;
}
.fade-enter, .fade-leave-to{
  height: 0px;
}
.fade2-enter-active, .fade2-leave-active {
  transition: opacity .5s;
}
.fade2-enter, .fade2-leave-to{
  opacity: 0;
}
</style>    
<template>	
    <article class="shrink">
        <div class="title" :style="titleStyle" @click="conversion">
           <div class="title-tip" >{{title}}</div>
           <i class="shrink-ico components" :class="openIf?'open':''">&#xe669;</i>
        </div>
        <transition name="fade">
         <v-loadText v-if="loaderIf&&openIf" class="loadText"></v-loadText>
       </transition>
     <transition name="fades" v-if="!slots" >
        <div ref="val"  :style="!loaderIf?valStyle:{height:'1px'}"  :class="!loaderIf?'shrink-val':'shrink-load'">
          <slot></slot>
        </div>
  </transition>
        <div v-else class="shrink-op" ref="op">
           <slot></slot>
        </div>
    </article>
</template>
<script>

    export default {

        data(){
        		return{
               slots:false,
               openIf:true,
               openHeight:'',
               valStyle:{
                 height:''
               }
        		}
        },
        watch:{
 
        },
        methods:{
           conversion(){
              var conIf = this.openIf = !this.openIf;
              this.addEmit();
              this.setValStyle()
           },
           addEmit(){
            if(this.openIf){
                this.$emit('open',this.shrinkKey);
              }else{
                this.$emit('shrink',this.shrinkKey);
              }
           },
           setValStyle(){
               var style = {}
               if(this.openIf){
          
                  style.minHeight = `${this.openHeight}px`
               }else{
                  style.height = '0px'
               }
               this.$set(this.$data,'valStyle',style);
           },
           addOpenHeight(){
             var height = '';
             if(this.slots){
               height = this.$refs.op.offsetHeight;
             }else if(!this.slots&&this.loaderIf){
               height = this.$refs.val.scrollHeight;
             }else{
               height = this.$refs.val.offsetHeight;
             }
             this.openHeight = height;
             this.slots = false;
           }
        },
        created(){
          if(this.type === 'shrink'){
            this.slots = true;
            this.openIf = false;
          }
        },
        mounted(){
            this.addOpenHeight();
            this.setValStyle();
            this.addEmit();
        },
        props:{
            loaderIf:{//是否显示正在加载中
               type:Boolean,
               default:false
            },
            shrinkKey:{//返回的标识符
              type: String,
              default: ''
            },
            title: {//提示
               type: String,
                default: ''
            },
            titleStyle:{//提示层样式
                type: Object,
                default: function() {
                   return {}
                }
            },
            type:{//类型:open：展开，shrink：收缩
              type: String,
              default: 'open'
            }
        },   
        
    }
</script>