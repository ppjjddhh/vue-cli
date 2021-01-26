<style lang="scss" scoped>
@import '~scss';
.uploadFile{
  position: relative;
  img{
    width: 2.133333rem;
    height: 2.133333rem;
    border-radius: 100%;
  }
}
.title{
  color:#b6b9c2
}
.files{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right:0;
  opacity: 0;
  z-index: 1;
}
</style>    
<template>
   <div class="uploadFile">
     <!-- <span v-if="!imgSrc" class="title">{{uploadTitle}}</span> -->
     <img :src="imgSrc" alt="" :style="configure.imgStyle">
     <input type="file" class="files" @change="addFile">
   </div>
    
</template>
<script>
    export default {
        inject:{form: { default: false }},
        watch:{
          configure(o){
            if(typeof o.accept === 'string'){
               this.accept = o.accept;
            }
            return o
          }
 
        },
        data(){
          return{
               imgSrc:'',//图片预览路径
               accept:'',//图片上传要求类型
               flieVal:''
            }
        }, 

        methods:{
          preview(){//预览

             var reader = new FileReader();
             reader.readAsDataURL(this.flieVal);
             reader.addEventListener("load", (event)=>{
               let imgSrc = reader.result;
               this.imgSrc = imgSrc;
               this.$emit('reader',imgSrc);
             })
          },
          upload(){
              
          },
           addFile(){
             var evt = window.event.target;
             var file = evt.files[0];
             var judgment = true;
             this.flieVal = file;

             if(typeof this.configure.accept instanceof RegExp){
                   judgment = this.configure.accept.test(file.type);
              }else if(this.accept){
                  judgment = this.accept.indexOf(file.type)!=-1;
              }
              if(!judgment){
                 this.$emit('error','上传图片类型错误');
                 this.input('');
                 return 
              }
             this.$emit('filesLoad',this.flieVal);
             this.input(true);
             switch(this.configure.type){
                default:
                  this.preview();
                  break;
                
             }

           },
           input(o){
               if(this.form){
                  this.$parent.verification(o);
               }
                
            },
            
        },
        mounted(){
           this.imgSrc = this.configure.src
        },
        props: { 
            /** {
               accept:上传的要求类型
               type:上传类型preview：预览（默认），upload：上传，all:预览加上传,
               src:初始展示的文件路径
               imgStyle：图片样式
            }*/
            configure:{
                type:Object,
                default:(o)=> {return {type:'preview'}}
            },
            uploadTitle:{//文字提示
              type:String,
              default:'请选择要上传的图片'
            }
            
           
        },

        
    }
</script>