<template>
  <section class="accounting-detail">
    <header>
      <article>
        <p>
          <span>姓名</span>
          <span>{{name}}</span>
        </p>
        <p>
          <span>身份证号码</span>
          <span>{{ids}}</span>
        </p>
      </article>
    </header>
    <main v-if="allData.results === '-1'">
      <img src="../../images/wujieguo.png" alt="图标">
      <p>暂未查询到你的新冠病毒</p>
      <p>核酸/抗体检测结果</p>
    </main>
    <div v-else>
      <p>核酸检测结果</p>
      <p>
        <span class="yang" v-if="allData.results === '1'">阳性</span>
        <span class="yin" v-if="allData.results === '0'">阴性</span>
      </p>
      <div>
        <p>检测时间：{{allData.date}}</p>
        <p>检测机构：{{allData.dept}}</p>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "accounting-detail",
  data() {
    return {
      name:'',
      ids:'',
      allData:''
    }
  },
  computed: {
    ...mapGetters([])
  },
  created() {
    let obj = JSON.parse(this.$route.query.data);
    this.name = obj.name;
    this.ids = obj.ids;
    this.getAccountingConsult(obj);
  },
  methods: {
    /* 获取核算检测结果 */
    getAccountingConsult(obj){
      this.$store.dispatch('accountingConsult',{
        name:obj.name,
        idnumber:obj.ids
      }).then(res =>{
        console.log(res);
        this.allData = res.data;
      })
    }
  },
}
</script>

<style scoped lang="scss">
.accounting-detail {
  padding: .38rem .34rem;
  &>header{
    margin-bottom: .38rem;
    &>article{
      border-radius: .16rem;
      box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.29);
      background-color: #ffffff;
      padding: 0 .3rem;
      &>p{
        &:nth-of-type(1){
          border-bottom: 1px solid #D8D8D8;
          display: flex;
          flex-direction: column;
          padding: .22rem 0;
          font-size: .26rem;
          color: #999999;
          &>span{
            margin-bottom: .15rem;
          }
        }
        &:nth-of-type(2){
          display: flex;
          flex-direction: column;
          padding: .22rem 0;
          font-size: .26rem;
          color: #999999;
          &>span{
            margin-bottom: .15rem;
          }
        }
      }
    }
  }
  &>main{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: .34rem;
    color: #B3BED1;
    height: 3.47rem;
    border-radius: .16rem;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.29);
    background-color: #ffffff;
    &>img{
      width: .86rem;
      height: .96rem;
      margin-bottom: .24rem;
    }
    &>p{
      &:nth-of-type(1){
        margin-bottom: .1rem;
      }
    }

  }
  &>div{
    font-size: .34rem;
    color: #B3BED1;
    height: 5.43rem;
    border-radius: .16rem;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.29);
    background-color: #ffffff;
    padding: 0 .26rem;
    &>p{
      &:nth-of-type(1){
        color: #313131;
        font-size: .34rem;
        font-weight: 500;
        padding: .16rem 0;
        border-bottom: 1px solid #D8D8D8;
      }
      &:nth-of-type(2){
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: .58rem;
        &>.yang{
          width: 1.67rem;
          height: 1.67rem;
          border-radius: 50%;
          background-color: #DC4848;
          color: #ffffff;
          font-size: .38rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &>.yin{
          width: 1.67rem;
          height: 1.67rem;
          border-radius: 50%;
          background-color: #53C140;
          color: #ffffff;
          font-size: .38rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    &>div{
      border-radius: .12rem;
      background-color: #F0F0F0;
      padding: .25rem .32rem;
      &>p{
        font-size: .28rem;
        color: #666666;
        &:nth-of-type(1){
          margin-bottom: .1rem;
        }
      }
    }
  }
}
</style>
