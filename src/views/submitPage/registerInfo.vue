<style lang="scss" scoped>
@import '~scss';
  .index{

    height:100%;
    background-color:#f3f4f7;
    position: relative;

    .banner {
      width: 100%;
    }

    .index-box {
      position: absolute;
      top: 5rem;
      border-radius: .6rem;
      background-color:#f3f4f7;
      width: 100%;

    }

    .card-two {
      margin-top: 1rem;
    }

    .title {
      font-weight: 600;
      font-size: 0.373333rem;
      background-color:#f3f4f7;
      text-align: center;
      padding-bottom: .4rem;

      div {
        margin-bottom: .2rem;
      }
    }

      .people-info {
        font-weight: 700;
      }

    .form {
      background-color: #f3f4f7;

      ul {
        li {
          padding-right: .5rem;
          padding-left: .5rem;
          .LTivew-form-item-label {
            font-weight: 650;
          }
        }
      }

      .btnClass {
        background: red;
      }
      .sub {
        background: red !important;
      }
    }

    .LTivew-form-item {
      background: unset;
    }

    .radio {

      .radio-one {
        margin-bottom: .2rem;
      }
    }

    .people-info {
      background: linear-gradient(135deg, #11A981 0%, #4373FD 100%);
      border-radius: .3rem .3rem 0 0;
      height: 1.5rem;
      line-height: 1.1rem;
      font-size: 0.4rem;
      color: #fff;
      padding-left: 0.2rem;
    }

    .card-form {
        border-radius: .5rem .5rem 0 0;
        margin-top: -.5rem;
        background: #fff;
    }

  .card-last {
    margin-top: 1rem;
    color:#666666;
    .prompt{
          background: linear-gradient(135deg, #FFCC43 0%, #FF7E28 100%);
          border-radius: .3rem .3rem 0 0;
          height: 1.5rem;
          line-height: 1.1rem;
          font-size: 0.4rem;
          color: #fff;
          padding-left: 0.2rem;
          font-size: 0.4rem;
    }

    img {
      width: .5rem;
      height: .5rem;
      vertical-align: middle;
    }

    .last-card {
       border-radius: .5rem .5rem 0 0;
        margin-top: -.5rem;
        background: #fff;

        > div {
          padding: .2rem;
          display: flex;
        }
    }
  }

  .radio-input {
    -webkit-appearance: radio;
  }
  .checkbox {
    -webkit-appearance: checkbox;
  }

  }
  .navs{
    @include bpadkJ(center);
  }
  .box {
    margin: 0.5rem;
    background: #fff;

    .form {
      padding: .1rem;
    }

    .card {
      ul {
        padding: .2rem;
      }
    }
  }

  .LTivew-input-center {
    width: 80%;
  }

</style>
<template>
    <article class="index">
       <nav class="navs">
          <img class="banner" src="../../images/banner@2x.png" />
       </nav>
       <div class="index-box">
          <div class="box">
            <div class="title">
              <div> 2020年南京医科大学附属妇产医院 </div>
              <div> 妇产科护理学术论坛 </div>
            </div>

              <LTIForm enctype="application/json" class="form"   btnClass="btnClass" :model="register" @submit="registerSub" btnVal="提交报名" @close="errorFun">
                <div class="card">
                  <div class="people-info">个人信息</div>
                  <div class="card-form">
                    <LTIFormItem  prop="name" label="姓名">
                      <LTIInput v-model="register.name" title="请输入您的姓名(必填)" ></LTIInput>
                    </LTIFormItem>
                    <LTIFormItem  prop="gender" label="性别">
                      <LTISelect v-model="register.gender"  title="请选择性别(必填)"  :select="sextype" :id="register.gender"></LTISelect>
                    </LTIFormItem>
                    <LTIFormItem  prop="age" label="年龄">
                      <LTIInput v-model="register.age" title="请输入您的年龄(必填)" ></LTIInput>
                    </LTIFormItem>
                    <LTIFormItem  prop="mobile" label="手机号">
                      <LTIInput v-model="register.mobile" title="请输入您的手机号(必填)" ></LTIInput>
                    </LTIFormItem>
                    <LTIFormItem  prop="title" label="职称">
                      <LTISelect v-model="register.title"  title="请选择职称(必选)"  :select="title" :id="register.title"></LTISelect>
                    </LTIFormItem>
                    <LTIFormItem  prop="company" label="工作单位">
                      <LTIInput v-model="register.company" title="请输入您的工作单位(必填)" ></LTIInput>
                    </LTIFormItem>
                    <LTIFormItem  prop="idCardNo" label="身份证号">
                      <LTIInput v-model="register.idCardNo" title="请输入您的身份证号(必填)" ></LTIInput>
                    </LTIFormItem>
                  </div>
                </div>

              <div class="card card-two">
                  <div class="people-info">参会信息</div>
                  <div class="card-form">
                 <LTIFormItem class="radio"  prop="meetingClass" label="参会名称">
                   <div class="radio-one">
                      <input class="radio-input" type="radio" id="1" value="1" v-model="register.meetingClass">
                      <label for="one">分论坛一：基于循证理论的围产期护理发展新视角、新理念、新方法</label>
                   </div>
                     <div>
                       <input class="radio-input" type="radio" id="2" value="2" v-model="register.meetingClass">
                      <label for="two">分论坛二：加速康复外科运用于妇科围手术期护理策略培训班</label>
                   </div>
                  </LTIFormItem>
                  <LTIFormItem  prop="meetingType" label="参会方式">
                    <LTISelect v-model="register.meetingType"  title="参会方式(必选)"  :select="meetingType" :id="register.meetingType"></LTISelect>
                  </LTIFormItem>
                  <LTIFormItem  prop="isStay" label="是否住宿">
                    <LTISelect v-model="register.isStay"  title="住宿(必填)"  :select="isStay" :id="register.isStay"></LTISelect>
                  </LTIFormItem>
                  <LTIFormItem  prop="checkInTime" label="入住时间">
                    <v-time title="请选择入住时间" type="date" v-model="register.checkInTime" :startDate="new Date(+new Date()+24*60*60*1000)"
                :defaultDate="new Date()" @select="timeSele"></v-time>
                  </LTIFormItem>
                  <LTIFormItem  prop="checkOutTime" label="离店时间">
                    <v-time title="请选择离店时间" type="date" v-model="register.checkOutTime" :startDate="new Date(+new Date()+24*60*60*1000)"
                :defaultDate="new Date()" @select="timeSele"></v-time>
                  </LTIFormItem>
                  <LTIFormItem  prop="isOtherTime" label="">
                    <input class="checkbox" type="checkbox" id="1" v-model="register.isOtherTime">
                    <label for="checkbox">我选择其他方式入住/离店</label>
                  </LTIFormItem>
                  </div>
              </div>
              <div class="card card-last">
                <div class="prompt">温馨提示</div>
                  <div class="last-card">
                    <div>
                      <img src="../../images/Tips.png" />
                      <span>入住时间、离店时间非必须项，线上课可不选</span>
                    </div>
                    <div>
                      <img src="../../images/Tips.png" />
                      <span>选择其他时间段入住/离店项，稍后会有会务组人员单线联系你。</span>
                    </div>
                  </div>
              </div>
              </LTIForm>
          </div>
       </div>
    </article>
</template>



<script>
import {mapActions,mapState} from 'vuex';
// import axios from 'axios';


import axios from 'axios';
    export default {
        data(){
      		return{
            registerRules:{
               name:[
                  {required: true, message: '请输入姓名'},
               ],
               gender:[
                 {required: true, message: '请选择性别'}
               ],
                age:[
                    {required: true, message: '请输入年龄'},
                ],
               mobile:[
                  {required: true, message: '请输入手机号'},
               ],
               title:[
                 {required: true, message: '请输入职称'},
               ],
               company:[
                 {required: true, message: '请输入工作单位'},
               ],
               idCardNo:[
                 {required: true, message: '请输入身份证号'},
               ],
              meetingClass:[
                 {required: true, message: '请选择参会名称'},
               ],
                 meetingType:[
                 {required: true, message: '请选择参会方式'},
               ],
                 isStay:[
                 {required: true, message: '请选择是否住宿'},
               ],
                 checkInTime:[
                 {required: true, message: '请选择入住时间'},
               ],
                 checkOutTime:[
                 {required: true, message: '请选择离店时间'},
               ],
             },
            sextype:[{key:'0',value:'男'},{key:'1',value:'女'}],
            isStay:[{key:'1',value:'是'},{key:'0',value:'否'}],
            meetingType:[{key:'1',value:'线上会议'},{key:'0',value:'线下会议'}],
            title:[{key:'0',value:'护士'},{key:'4',value:'护师'},{key:'1',value:'主管护师'},{key:'2',value:'副主任护师'},{key:'3',value:'主任护师'}],

            register: {
              name: '',
              gender: '',
              age: '',
              mobile: '',
              title: '',
              company: '',
              idCardNo: '',
              meetingClass: '',
              meetingType: '',
              isStay: '',
              checkInTime: '',
              checkOutTime: '',
              isOtherTime: ''
            }
          }
        },
        methods:{
            timeSele(o) {
                let time = `${o.getFullYear()}-${o.getMonth() + 1}-${o.getDate()}`;
                for (let i = 8; i < 21; i++) {
                    this.disHours.push(i)
                }

                this.showHour = true;
            },

          async registerSub(o){
             const that = this;
            const sex =  this.sextype.map(item => {
               if(item.value == '男') {
                 return 1;
               }
               return 0
             })

              const isStay = this.isStay.map((item) => {
               if(item.value == '是') {
                 return 1;
               }
               return 0
             })

              const meetingType = this.meetingType.map((item) => {
               if(item.value == '线上会议') {
                 return 1;
               }
               return 0
             })
              const title = this.title.map((item) => {
               if(item.value == '护士') {
                 return 0;
               } else if(item.value == '护师') {
                 return 4
               } else if(item.value == '主管护师') {
                 return 1
               } else if(item.value == '副主任护师') {
                 return 2
               } else if(item.value == '主任护师') {
                 return 3
               }
             })

              let isOtherTime = 0;
             if(this.register.isOtherTime) {
                isOtherTime = 1;
             }
            this.$store.dispatch('LS/submitValues', {
                ...this.register,
                gender: sex[0],
                meetingType: meetingType[0],
                isStay: isStay[0],
                title: title[0],
                isOtherTime: isOtherTime,
              }).then((res) => {
               if(res.ret_code === '0000') this.$router.push('/sueess');
              })

           },

           errorFun(o){
            this.$store.commit('setPromptClose',{promptTipIf:true,promptTip:o})
           }
        },
    }
</script>
