<template>
    <div class="counsel-home">
      <div class="top">
        <img :src="consulting.imgUrl">
        <div class="doctor-introduce">
          <div>您好，您想咨询什么问题？</div>
          <div>我将在上线时给您答复</div>
        </div>
      </div>
       <LTIForm
          enctype="application/json"
          class="form"
          btnClass="btnClass"
          :model="register"
          @submit="registerSub"
          btnVal="提交"
        >
           <van-field v-model="editData.name" label="姓名" v-if="editData.rewrite" placeholder="请输入姓名"/>
           <van-field v-model="editData.phone" type="tel" label="手机号"  maxlength="11" v-if="editData.rewrite" placeholder="请输入手机号"/>
           <van-field v-model="editData.sex" type="text" label="性别"v-if="editData.rewrite"  @click="show = true" placeholder="请选择性别"/>
<!--         <LTIFormItem  prop="people" label="问诊人">-->
<!--           <LTISelect-->
<!--             class="people"-->
<!--             v-model="register.people"-->
<!--             title="请选择问诊人"-->
<!--             :select="peopleList"-->
<!--             :id="register.people"-->
<!--           ></LTISelect>-->
<!--         </LTIFormItem>-->
           <van-field v-model="editData.age" type="tel" label="年龄" v-if="editData.rewrite" placeholder="请输入年龄"/>
           <textarea
              class="textarea"
              v-model="register.content"
              :id="register.content"
              placeholder="详细描述您的病情，包括症状、部位、出现的时间、持续时间、是否有其他伴随症状、大小便情况，饮食、睡眠情况；女性填写月经史、生育史、流产史"
          ></textarea>
          <div class="line"></div>
         <div class="img-list">
            <img :src="item.src" v-for="(item, i) in imgSrc" class="update-img">
          </div>
          <div class="update-file" v-if="imgSrc.length < 9">
            <img class="update-img" src="../../images/consulting/image@2x.png"/>
            <input accept='image/*' class="upimg" type="file" @change="addFile">
            <span class="update-title">如有病历、检验单、疾病部位等可拍照上传(最多9张)</span>
          </div>
        </LTIForm>
      <div>

      </div>
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" :round="false"/>
    </div>
</template>
<script>
import {Toast , Indicator } from 'mint-ui';
import {mapActions,mapState} from 'vuex';

import axios from 'axios';
    export default {
        data(){
      		return{
            consulting: {
              imgUrl: require('../../images/hushitouxiang.png'),
            },
            editData:{
              name:'',
              phone:'',
              sex:'',
              age:'',
              rewrite:false
            },
            registerRules:{
               people:[
                  {required: true, message: '请选择问诊人'}
               ],
               content:[
                 {required: true, message: '请描述病情'}
               ],
            },

            register:{
               people:'', // 问诊人
               content:'', // 描述
             },

            peopleList: [
              {
              key: 1,
              value: '李雪琴'
            },{
              key: 2,
              value: '李雪健'
            },{
              key: 3,
              value: '李云龙'
            }
            ],

            // 文件上传配置
            file: [],
            fileStatus: true,
            maxNum: 9,
            imgSrc: [],
            curImg: [],
            ifShowLenth: true,
            imgUrlArr:[],
            show: false,
            actions: [{ name: '男' }, { name: '女' }],
          }
        },

        methods:{
            //预览（区分图片和文件）
            async preview() {
                const readFileAsync = file => new Promise(resolve => {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = evt => resolve(evt.target.result)
                })
                // await同步的等待回调readFileAsync()
                for (let i = 0; i < this.fileVal.length; i++) {
                    var size = Math.round((this.fileVal[i].size) / 1024 / 1024 * 100) / 100;
                    this.imgSrc.push({
                        name: this.fileVal[i].name,
                        size: size,
                        src: await readFileAsync(this.fileVal[i])
                    })
                }
            },
          onSelect(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.show = false;
            this.editData.sex = item.name;
          },
          registerSub () {
              if(this.register.content.trim() === ''){
                Toast('请输入咨询内容！');
                return ;
              }
              if(this.editData.rewrite){
                if(this.editData.name === ''){
                  Toast('请输入姓名!');
                  return false;
                }else if(this.editData.phone === ''){
                  Toast('请输入手机号!');
                  return false;
                }else if(this.editData.sex === ""){
                  Toast('请选择性别!');
                  return false;
                }else if(this.editData.age === ""){
                  Toast('请选择年龄!');
                  return false;
                }else {
                  sessionStorage.setItem('phones',this.editData.phone);
                  sessionStorage.setItem('userNames',this.editData.name);
                }
              }
            this.$store.dispatch('putGraphicInformation', {
              adviceContent:this.register.content,
              adviceUserName:sessionStorage.getItem('userNames') != undefined && sessionStorage.getItem('userNames') != null ? sessionStorage.getItem('userNames'):'',
              // advicePic:this.imgSrc,
              adviceType:this.$route.query.type,
              advicePicArr:this.imgUrlArr,
              adviceUserPhone:sessionStorage.getItem('phones'),
              productId:sessionStorage.getItem('productId'),
              pltId:sessionStorage.getItem('pltId'),
              adviceUserAge:this.editData.rewrite ? this.editData.age:'',
              adviceUserSex:this.editData.rewrite ? this.editData.sex === '男' ? 1 : 0 :'',
            }).then(res => {
              if (res.data.code === '0') {
                Toast('提交成功！');
                setTimeout(()=>{
                  this.$router.push({path:'/counsel/success',query:{id:res.data.data}});
                },1000)
              } else {
                Toast(res.data.msg);
              }

            }).catch(err => {
              console.log(err)
            })
          },

          addFile(e) {
            this.fileVal = [];
            var files = e.target.files;
            let  imgFiles = new FormData();
            imgFiles.append('file',e.target.files[0]);
            this.upImg(imgFiles)
            if ((this.imgSrc.length + files.length) > this.maxNum) {
                return
            }

            if (files && files.length) {
                // 原始FileList对象不可更改，所以将其赋予curFiles提供接下来的修改
                Array.prototype.push.apply(this.fileVal, files);
            }
            this.curImg.push.apply(this.curImg, this.fileVal)
            this.$emit('filesLoad', this.curImg);
            this.preview();
          },
          /* 上传图片至服务器 */
          upImg(obj){
            Indicator.open();
            this.$store.dispatch('upDateImg', obj).then(res => {
              if (res.data.code === '0') {
                this.imgUrlArr.push(res.data.imgUrl);
                console.log(this.imgUrlArr)
              } else {
                Toast(res.data.msg);
              }
              Indicator.close();
            }).catch(err => {
              console.log(err)
              Indicator.close();
            })
          }
        },
        mounted() {},

        created (){
          this.$route.query.type === 1 ? this.$route.meta.title = '图文咨询':this.$route.meta.title = '电话咨询';
          sessionStorage.getItem('rewrite') === 'true' ? this.editData.rewrite = true: this.editData.rewrite = false;
        }
    }
</script>
<style lang="scss" scoped>
@import '~scss';
.counsel-home {
  color: #666666;
  background: #fff;
  padding: .5rem;
  height: 100%;
  position: flex;
  .top {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-bottom: .2rem;
    img {
      height: 1rem;
      width: 1rem;
    }
  }

  /deep/ .people {
    text-align: right;
  }

  /deep/ .btnClass {
    border-radius: unset;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    margin-top: 1rem;
    position: absolute;
    bottom: 0;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
  }

  .doctor-introduce {
    color: #666666;
    margin-left: .2rem;
    font-size:.28rem;
    :first-child {
      color: #333333;
      font-size: .38rem;
      margin-bottom: .2rem;
    }
  }

  .textarea {
    width: 100%;
    height: 3rem;
    padding: 0.1rem;
    font-size: .3rem;
  }

  .update-file {
    display: flex;
    justify-items: center;
    align-items: center;

    .update-img {
      height: 1.3rem;
      margin-top: .4rem;
    }

    .update-title {
      margin-left: .2rem;
      font-size: .3rem;
    }
  }

  .img-list {
    img {
      margin-right: 3.3%;
      height: 1.3rem;
      margin-top: .4rem;
      width: 22.5%;
    }

    img:last-child {
      margin-right: 0;
    }
  }



  .line {
    width: 100%;
    border-bottom: 1px solid #f3f4f7;
  }

  .upimg {
    height: 1.3rem;
    width: 2rem;
    margin-top: 0.4rem;
    margin-left: -1.3rem;
    opacity: 0;
  }
}

</style>
<style lang="scss">
.counsel-home{
  .van-field__label{
    font-size: .3rem;
  }
}
</style>
