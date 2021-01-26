<template>
  <section class="rumor-detail">
      <header>
        <p>{{allData.title}}</p>
        <img :src="allData.answerType === '1' ? trueImg:falseImg" alt="图片">
      </header>
      <section>
        <p>
          <img :src="allData.doctorLogo" alt="">
          <span>
            <em>蒋淑娣</em>
            <em>肿瘤科</em>
          </span>
        </p>
        <van-icon name="arrow" color="#666666"/>
      </section>
    <main>
      <p>{{allData.answerContentC}}</p>
    </main>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "rumor-detail",
  data() {
    return {
      allData:'',
      trueImg:require('../../images/zhende.png'),
      falseImg:require('../../images/jiade.png'),
    }
  },
  computed: {
    ...mapGetters([])
  },
  created() {
      this.allData = JSON.parse(this.$route.query.data);
      console.log(this.allData)
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.rumor-detail {
  height: 100%;
  background-color: #ffffff;
  padding: 0 .3rem;
  &>header{
    padding: .4rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &>p{
      font-size: .38rem;
      color: #333333;
      margin-right: .32rem;
    }
    &>img{
      width: .88rem;
      height: .88rem;
    }
  }
  &>section{
      display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .18rem .24rem;
    border-radius: .08rem;
    background-color: #fafafa;
    margin-bottom: .5rem;
    &>p{
      display: flex;
      align-items: center;
      &>img{
        width: .9rem;
        height: .9rem;
        margin-right: .28rem;
        border-radius: 50%;
      }
      &>span{
        display: flex;
        flex-direction: column;
        font-size: .3rem;
        &>em{
          font-style: normal;
          &:nth-of-type(2){
            font-size: .26rem;
            color: #717171;
          }
        }
      }
    }
  }
  &>main{
    font-size: .28rem;
  }
}
</style>
