<style lang="scss" scoped>
@import '~scss';
@import '../css/base.css';
.bj{
    position: absolute;
    top:0;
    left:0;
    right:0;
    height:100%;
    z-index:99; 
    background-color:rgba(0,0,0,.7)
}
.val{
  position: absolute;
  left:0;
  right:0;
  background-color:#fff;
  font-size: 0.373333rem;
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
.timeVal,.icoClose{
  vertical-align: middle;
    display: inline-block;
}
</style>    
<template>
   <div class="">
     <div @click="addSelect" class="input-index" > 
       <div :class="!pickerValue?'titleColor':''" class="timeVal">{{pickerValue||title}}</div>
       <slot v-if="pickerValue"></slot>
       <i class="icoClose components">&#xe65c;</i>
     </div>
     <DatetimePicker
      ref="picker"
      type="time"
    v-model="date" v-if="type=='time'" :startHour="startHour" :endHour="endHour" @confirm="confirm">
      </DatetimePicker>

      <DatetimePicker
      ref="picker"
      type="date"
    v-model="date" v-else year-format="{value} 年"
  month-format="{value} 月"
  date-format="{value} 日"
   @confirm="confirm" :startDate="startDate" :endDate="endDate">
      </DatetimePicker>
   </div>
    
</template>
<script>
    import {Time} from 'base';
    import { DatetimePicker } from 'mint-ui';
    export default {
        inject:{form: { default: false }},
        components:{
          DatetimePicker
        },
        data(){
        return{
             pickerValue:'',
             date:''
          }
        }, 
        watch:{
          defaultTime(o){
             this.init(o);
             return o
          },
        },
        methods:{
           input(o){
               if(this.form){
                  this.$parent.verification(o);
               } 
            },
            confirm(o){
              var date,pickerValue;
              if(this.type =='time'){
                  date = o;
                  pickerValue = date;
              }else if(this.type == 'age'){
                  date = new Date().getFullYear()-new Date(o).getFullYear();
                  pickerValue = date +'岁'
              }else{
                 
                  date = Time.setTime(+new Date(o));
                  pickerValue = date;
              }
              this.pickerValue = pickerValue;
              if(this.outType == 'time'){
                this.$emit('input',`${o.getFullYear()}-${o.getMonth()+1}-${o.getDate()}`);
              }else{
                this.$emit('input',date);
              }
              
              this.$emit('select',o)
              this.input(date);
            },
            addSelect(){
              this.$refs.picker.open();
              
            },
            convertDate(o){
              if(this.type == 'age'){
                 return new Date(new Date().getFullYear()-this.value,0,1);
              }
              else if(o.constructor === Date){
                 return o
              }else if(o.constructor === String){
                var y =o.split('-');
                return new Date(y[0]||0,y[1]-1||0,y[2]||1);
              }
            },
            init(o){
               let value = this.type!='time'?this.convertDate(o):o;
             this.date = value;
             this.confirm(value);
            }
        },
        mounted(){
           this.$refs.picker.$el.addEventListener('onmousemove',(e)=>{})
          if(this.value){
            this.init(this.value);
          
          }
         
        },
        props: {
            outType:{
              type:String,
              default:''
            },
            defaultTime:{
             type:[String,Date,Number],
             default:''
            },
            endDate:{
              type:Date
            },
            startDate:{
              type:Date,              
            },
            value:{
             type:[String,Date,Number],
             default:''
            },
            title:{
              type:String
            },
            type:{
               type:String,
               default:'date'
            },
            startHour:{
               type:Number,
               default:0
            },
            endHour:{
              type:Number,
               default:23
            }
           
        },

        
    }
</script>