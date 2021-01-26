<style lang="scss" scoped>
@import '~scss';
.button{
    width:100%;
    height:1.2rem ;
    line-height:1.2rem ;
    text-align: center;
    border-radius:0.106667rem;
    font-size: 0.426667rem;
    border-radius:1.2rem ;
    transition:all .3s;
}
.sub{
  background: linear-gradient(to right,#208af4,#51bff7);
  color:#fff;
}
.op{
    background-color: #eaeaea;
    color:#999;
}
.bts{
  text-align: center;
  background-color:#fff;
  padding:0.133333rem 0;
}

.form{
  height:100%;
}
.form-vals>li{
   padding-left: 0.266667rem;
   padding-right: 0.266667rem;
}
.form-vals{
  flex:1;
}

</style>    
<template>
	<form @submit="submit" ref="form" class="clom form">
      <div class="form-vals">
    
        <ul>
          <slot></slot>
        </ul>
 
      </div>
      <!-- <v-button :buttonIf="buttonIf" :buttons="buttons"></v-button> -->
      <div class="bts" :style="btsStyle">
         <button class="button" :class="!buttonIf?'op':'sub'">{{buttons}}</button>
      </div>
    </form>

	
</template>
<script>
import form  from './form.js'
import {verifying} from '../lib/base.js'
import verification from './verification'
    export default {
        mixins:[verification],
        watch:{
         
        },
        provide:{
            form:true
        },
        data(){
      		return{
      			buttonIf:false,//判断是否可以提交
            verificationValue:{},//判断对象
            message:'',
            rulesObject:{},
            otherObject:{},//其他验证方法
            result:false,//是否可提交
            requiredObj:{},//必填值验证规则
            buttonObj:{},//没有通过必填验证的内容
            resultObj:{},//其他选项是否验证通过
      		}
        }, 
        methods:{
            verification({key,val}){//验证
               var valType = verifying.emptyValue(val)
               var _this = this,buttonArr = [];
               if(_this.buttonObj[key]&&valType){
                  delete _this.buttonObj[key]
               }else if(_this.requiredObj[key]&&!valType){
                  _this.buttonObj[key] = {};
                  _this.buttonObj[key].message = _this.requiredObj[key].message;
               }
               _this.judgeButtonIf();
               //                //  _this.result = Object.keys(_this.verificationValue).every((i)=>{
               //      if(!_this.verificationValue[i].result&&_this.verificationValue[i].required){
               //          buttonArr.push(false);
               //      }
               //      if(!_this.verificationValue[i].result){
               //        _this.errKey = i;
               //        _this.message = _this.verificationValue[i].message;
               //      }
               //    return _this.verificationValue[i].result;
               //  })
               //  _this.buttonIf = !buttonArr.length;
                
            },
            submit(e){//提交
                e.preventDefault();
                if(!this.buttonIf){
                  return;
                }
                  this.judgeResultIf(); 
                  if(!this.result){
                    this.$store.commit('setPromptClose',{promptTipIf:true,promptTip:this.message})
                    return 
                  }     
                this.$emit('submit');
            },
    	    bjTap(){
    		    this.$emit('bjTap');
    	    },
          addVerification(a,b){
         
            let id = Object.keys(a)[0];
            a[id].every((key)=>{
                 let o = this.model[b];
               if(key.required){
                     this.verificationValue[id] = {};
                     this.verificationValue[id].result = verifying.emptyValue(o);
                     this.verificationValue[i].required = true
                     this.verificationValue[id].message = key.message;
                     return false;
                 }
            })
            for(let key in this.rulesObject){
              a[key] = this.rulesObject[key];
            }
            this.rulesObject = a;
            this.verification();
          },
          deleteVerification(a){
            delete this.verificationValue[a];
            this.verification();
          },
          judgeButtonIf(){
            this.buttonIf =  !Object.keys(this.buttonObj).length
          },
          judgeResultIf(){
            var _this = this,keys = Object.keys(_this.otherObject);
            if(!keys.length){
              _this.result = true;
              _this.message = '';
              return ;
            }
           _this.result = keys.every((i)=>{
               return  _this.otherObject[i].every((j)=>{
                    j.val = _this.model[i];
                    if(!verifying.emptyValue(j.val)){
                      return true;
                    }else{
                      let result = _this.case(j);
                      _this.message = j.message;
                      return result
                    }      
                 });
            })
          },
          init(){
             var _this = this;
             Object.keys(_this.rules).forEach((i)=>{
             _this.rules[i].forEach((key)=>{
                 if(key.required){
                     _this.requiredObj[i] = key;
                 }
                 else{
                     _this.otherObject[i] = _this.otherObject[i]?_this.otherObject[i]:[]
                     _this.otherObject[i].push(key)
                 }
                 if(key.required&&!verifying.emptyValue(_this.model[i])){
                    _this.buttonObj[i] = {};
                    _this.buttonObj[i].message = key.message;
                }
                 
             })

           })
             
              _this.judgeButtonIf();
             
           // _this.rulesObject = _this.rules;
           // _this.verification();
          }
        },
        created(){
           if(this.$store){
             this.$store.registerModule('form',form)
           }
           this.init();
           
        },
        props: {
            btsStyle:{//提交样式
               type: Object,
               default: function(){
                  return {}
               }
            },
            model: {//表单内容
                type: Object,
                default: function(){
                  return {}
               }
            },
            rules:{//表单验证方法
                type: Object,
                default: function(){
                  return {}
               }
            },
            buttons:{//form按钮名字
              type:String,
              default:'提交'
            }           
        }
    }
</script>