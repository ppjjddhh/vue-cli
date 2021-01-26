<template>
  <section class="escort-detail">
    <header>
      <img :src="detailData.titleLogo" alt="医生背景图片">
      <p>{{detailData.title}}</p>
      <p>{{detailData.createTime}}</p>
      <div>
        <div @click="show = !show">
          <div>
            <img :src="detailData.doctorLogo" alt="医生头像">
            <p>
              <span>{{detailData.doctorName}}</span>
              <span>{{ detailData.deptName }}</span>
            </p>
          </div>
          <img src="../../images/btn_more@2x.png" alt="图标">
        </div>
      </div>
    </header>
    <main>
      <p><!--讲座介绍--></p>
      <div v-html="detailData.famousContent"></div>
    </main>
    <footer>
      <img src="../../images/quxiaodianzan.png" alt="点赞图标" @click="iLike" v-if="dzType">
      <img src="../../images/dianzandabuzhi.png" alt="点赞图标" @click="iLike" v-if="!dzType">
      <p>{{detailData.dzCount}}人觉得有帮助</p>
    </footer>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
          <div>
            <img src="../../images/yishengjieshaobeijing.png" alt="">
            <div>
              <img :src="detailData.doctorLogo" alt="医生头像">
              <p>
                <span>{{detailData.doctorName}}</span>
                <span>{{detailData.deptName}}&nbsp;&nbsp;&nbsp;{{detailData.professionalTitle}}</span>
              </p>
            </div>
            <p>
              {{detailData.doctorDesc}}
            </p>
            <p @click="show = false">
              <img src="../../images/closeIcon.png" alt="关闭">
              <span>关闭</span>
            </p>
          </div>
      </div>
    </van-overlay>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';
import { Toast } from 'vant';
export default {
  name: "escort-detail",
  data() {
    return {
      show:false,
      allData:'',
      detailData:'',
      dzType:false
    }
  },
  computed: {
    ...mapGetters([])
  },
  created() {
    this.getDetailData();
  },
  methods: {
    /* 获取详情 */
    getDetailData(){
      this.allData = JSON.parse(this.$route.query.data);
      this.$store.dispatch('getEscortList',{
        id:this.allData.id
      }).then( res =>{
        console.log(res);
        this.detailData = res.data.data;
        this.getLikeMsg();
      })
    },
    /* 点赞 */
    iLike(){
      let obj ={
        famousDoctorInfoId:this.detailData.id,
        userName:'测试哦',
        userPhoneNo:'17551125125',
        dzType:this.dzType ? 0:1
      }
      this.$store.dispatch('giveLike',obj).then( res =>{
        console.log(res);
        if(res.data.code === '0'){
          Toast(this.dzType ? '取消点赞成功!':'点赞成功!');
          this.getDetailData();
        }
      } )
    },
    /* 获取点赞查询信息 */
    getLikeMsg(){
      this.$store.dispatch('checkLike',{
        famousDoctorInfoId:this.detailData.id,
        userPhoneNo:'17551125125'
      }).then(res =>{
        console.log(res);
        this.dzType = res.data.data.dzType === '1' ? true:false;
      })
    }
  },
}
</script>

<style lang="scss">
.escort-detail {
  background-color: #ffffff;
  height: 100%;

  & > header {
    & > img {
      width: 100%;
      height: 3.4rem;
    }

    & > p {
      padding-left: .3rem;

      &:nth-of-type(1) {
        color: #333333;
        font-size: .38rem;
        padding-top: .4rem;
      }

      &:nth-of-type(2) {
        font-size: .26rem;
        color: #A3A3A3;
        padding-top: .15rem;
        margin-bottom: .3rem;
      }
    }

    & > div {
      padding: 0 .3rem;

      & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .18rem .24rem;
        background-color: #FAFAFA;
        border-radius: .08rem;
        & > div {
          display: flex;
          align-items: center;

          & > img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            margin-right: .3rem;
          }

          & > p {
            display: flex;
            flex-direction: column;
            font-size: .3rem;
            color: #3A3A3A;
            &>span:nth-of-type(2){
              color: #717171;
            }
          }
        }
        &>img{
          width: .44rem;
          height: .52rem;
        }
      }
    }
  }

  &>main{
    padding: .5rem .3rem;
    &>p{
      font-size: .34rem;
      &:nth-of-type(1){
        margin-bottom: .3rem;
      }
      &:nth-of-type(2),&:nth-of-type(3){
        font-size: .28rem;
        color: #7D7D7D;
      }

    }
    &>div{
      font-size: .28rem;
      color: #7D7D7D;
      img{
        width: 100%;
      }
      &>p{
        &>img{
          width: 100% !important;
        }
      }
    }
  }

  &>footer{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    &>img{
      width: 2.2rem;
      height: 2.2rem;
      margin-bottom: .2rem;
    }
    &>p{
      color: #666666;
      font-size: .24rem;
    }
  }
  .wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    &>div{
      position: relative;
      width: 70%;
      height: 6.4rem;
      &>img{
        width: 100%;
      }
      &>div{
        position: absolute;
        top: .4rem;
        left: .4rem;
        display: flex;
        align-items: center;
        &>img{
          width: 1rem;
          margin-right: .2rem;
          border-radius: 50%;
        }
        &>p{
          display: flex;
          flex-direction: column;
          font-size: .3rem;
          color: #ffffff;
        }
      }
      &>p{
        &:nth-of-type(1){
          position: absolute;
          top: 2.2rem;
          padding: 0 .6rem;
          color: #7D7D7D;
          font-size: .3rem;
          height: 4rem;
        }
        &:nth-of-type(2){
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 4.6rem;
          color: #7D7D7D;
          width: 100%;
          &>img{
            width: .8rem;
            margin-bottom: .1rem;
          }
        }
      }
    }
  }
}
</style>
