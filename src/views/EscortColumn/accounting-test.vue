<template>
  <section class="accounting-test">
    <header>
      <img src="../../images/hesuanjiance.png" alt="背景">
    </header>
    <main>
      <article>
        <p>身份信息</p>
        <p>
          <span>姓名</span>
          <input type="text" placeholder="请输入姓名" v-model="name">
        </p>
        <p>
          <span>身份证号码</span>
          <input type="text" placeholder="请输入身份证号码" maxlength="18" v-model="ids">
        </p>
      </article>
      <p>
        <button @click="checkConsult">立即查询</button>
      </p>
    </main>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';
import { Toast } from 'vant';
export default {
  name: "accounting-test",
  data() {
    return {
      name:'',
      ids:''
    }
  },
  computed: {
    ...mapGetters([])
  },
  created() {

  },
  methods: {
    /* 跳转查询页面 */
    checkConsult(){
      if(this.name === ''){
        Toast('请输入姓名！');
        return  false;
      }else if(this.ids === ''){
        Toast('请输入身份证号！');
        return  false;
      }else {
        let obj ={
          name:this.name,
          ids:this.ids
        }
        this.$router.push({path:'/EscortColumn/accounting-detail',query:{data:JSON.stringify(obj)}});
      }
    }
  },
}
</script>

<style scoped lang="scss">
.accounting-test {
  &>header{
    &>img{
      width: 100%;
      height: 5.64rem;
    }
  }
  &>main{
    padding: .38rem .34rem;
    &>article{
      border-radius: .16rem;
      box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.29);
      background-color: #ffffff;
      padding: 0 .3rem;
      &>p{
        &:nth-of-type(1){
          padding:  .2rem 0;
          font-size: .34rem;
          color: #313131;
          border-bottom: 1px solid #D8D8D8;
        }
        &:nth-of-type(2){
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
        &:nth-of-type(3){
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
    &>p{
      padding-top: .38rem;
      &>button{
        height: .86rem;
        width: 100%;
        background-color: #4231FF;
        color: #ffffff;
        font-size: .32rem;
        border-radius: .16rem;
        border: none;
        outline: none;
      }
    }
  }
}
</style>
