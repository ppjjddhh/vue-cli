<style lang="scss" scoped>
@import '~scss';
@import '../css/base.css';
.bj{
    height:100%;
    background-color:rgba(0,0,0,.7)
}
.val{
  position: absolute;
  left:0;
  right:0;
  bottom:0;
  background-color:#fff;
  max-height:40%;
  overflow: auto;
  font-size: 0.373333rem;
  z-index:2;
  li{
    text-align: center;
    padding:0.4rem 0;
    border-bottom:1px solid #eaeaea;
  }
}
.selected{
  color:#3f84df;
}
.input-index{
    flex:1;
    position: relative;
    padding-right: 0.8rem;
}
.icoClose{
    width:0.533333rem;
    color:#c8c9d0;
    text-align: center;
    padding-left:0.136667rem;
    vertical-align: middle;
    display: inline-block;
    position: absolute;
    right:0px;
    top:50%;
    transform: translateY(-48%);
}
.select{
  width:100%;
}
.titleColor{
  color:#b6b9c2
}
.op{
  animation:mymove .3s ;
  animation-fill-mode:forwards;
}
@keyframes mymove{
   from{
     bottom:-100%;
   }
   to{
      bottom:0;
   }
}
.select-val{
      vertical-align: middle;
    display: inline-block;
}
.select-lis{
  position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    height:100%;
    z-index:999;
}
</style>    
<template>
   <div class="select">
     <div @click="addSelect" class="input-index" > 
       <div :class="!val?'titleColor':''" class="select-val">{{val||title}}</div>
       <i class="icoClose components">&#xe65c;</i>
     </div>
      <div   v-if="seleceIf" class="select-lis">
        <div @touchmove="touchmove" class="bj" @click="addSelect">
          
        </div>
        <ul class="val" :class="seleceIf?'op':''">
          <li v-for="li in select" :key="Object.keys(li)[0]" :class="selectKey==Object.keys(li)[0]?'selected':''"  @click="click(li)">{{Object.values(li)[0]}}</li>
        </ul>
    </div>
   </div>
    
</template>
<script>
    export default {
        inject:{form: { default: false }},
        watch:{
        },
        data(){
        return{
             val:'',
             selectKey:'',
             seleceIf:false
          }
        }, 

        methods:{
           input(o){
               if(this.form){
                  this.$parent.verification(o);
               }
                
            },
            addSelect(e){

              window.event.stopPropagation&&window.event.stopPropagation();
              this.seleceIf = !this.seleceIf
            },
           touchmove(e){
             e.preventDefault();
           },
           click(d,next){
             var o = {
                key:Object.keys(d)[0],
                val:Object.values(d)[0]
             };
             this.$emit('click',o);
             this.selectKey = o.key;
             
             var val = (this.outType == 'val')&&o.val||(this.outType == 'key')&&o.key;
             
             this.$emit('input',val+'');
             this.input(val);
             this.val = o.val;
             if(!next){
              this.addSelect(window.event)
             }
             
           },
           addId(o){
             let key = this.id+'';
             if(typeof this.id === "undefined"){
              this.val = this.value;
              return 
             }
             this.select.every((i)=>{
              
               let k = Object.keys(i)[0];
               if( k === key){
                 //this.input(i[k]);
                 this.click(i,true);
                 //this.selectKey = key;
                 //this.val = i[k];
                 return false;
               }
               return true
             })
             
           }
        },
        mounted(){
           if(this.id!==''){
             this.addId(this.id)
           }
        },
        props: {
            value:{
                type:[String,Number],
                default:''
            },
            select:{
                type:Array,
                default:[]
            },
            id:{
              type:[String,Number],

            },
            title:{
               type:String,
               default:''
            },
            outType:{
               type:String,
               default:'val'
            }

           
        },

        
    }
</script>