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
  .tip{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 2004;
  }
</style>
<template>
  <div class="">
    <div @click="addSelect" class="input-index">
      <div :class="!pickerValue?'titleColor':''" class="timeVal">{{pickerValue||title}}</div>
      <slot v-if="pickerValue"></slot>
      <i class="icoClose components">&#xe65c;</i>
    </div>

    <mt-popup v-model="visible" :closeOnClickModal="true" position="bottom" class="mint-datetime">
      <mt-picker
        :slots="dateSlots"
        @change="onChange"
        :visible-item-count="visibleItemCount"
        class="mint-datetime-picker"
        ref="picker"
        show-toolbar>
        <span class="mint-datetime-action mint-datetime-cancel" @click="visible = false;$emit('cancel')">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确认</span>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    name: "test",
    data(){
      return{
        visible: false,
        visibleItemCount: 7,
        pickerValue: '',
        date: ''
      }
    },
    computed: {
      dateSlots() {
        let time = this.timeList.map(item => {
          return item >9 ? "" +item : "0" + item
        });
        return [
          {
            flex: 1,
            values: time
          }, {
            divider: true,
            content: ':'
          }, {
            flex: 1,
            values: Array.from({length:60}, (v,k) => {
              return k >9 ? k : "0" + k
            })
          }
        ]
      }
    },
    methods:{
      confirm() {
        this.visible = false;
        this.pickerValue = this.date;
        this.$emit('input', this.pickerValue);
        this.$parent.verification(this.pickerValue);
      },
      onChange(picker, values) {
        this.date = values[0] + ":" + values[1];
      },
      addSelect() {
        this.visible = true;
        if(this.pickerValue) {
          let a = this.pickerValue.split(":");
          this.$refs.picker.setValues(a);
        }
      }
    },
    props: {
      timeList: {
        type: Array,
        default: []
      },
      defaultTime: {
        type: [String, Date, Number],
        default: ''
      },
      value: {
        type: [String, Date, Number],
        default: ''
      },
      title: {
        type: String
      },
      type: {
        type: String,
        default: 'date'
      },
      startHour: {
        type: Number,
        default: 0
      },
      endHour: {
        type: Number,
        default: 23
      }

    }
  }
</script>
