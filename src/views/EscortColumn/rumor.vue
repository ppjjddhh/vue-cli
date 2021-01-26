<template>
  <section class="rumor">
    <header>
      <img src="../../images/yaoyanfensuiji.png" alt="banner">
    </header>
    <main>
        <article v-for="item in allData.content" @click="goDetail(item)">
          <p>{{ item.title }}</p>
          <img :src="item.answerType === '1' ? trueImg:falseImg" alt="图片">
        </article>
    </main>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "rumor",
  data() {
    return {
      trueImg:require('../../images/zhende.png'),
      falseImg:require('../../images/jiade.png'),
      allData:''
    }
  },
  computed: {
    ...mapGetters([])
  },
  created() {
    this.getRumorList();
  },
  methods: {
    /* 获取留言列表 */
    getRumorList(){
      this.$store.dispatch('rumorList',{
        page:1,
        size:1000
      }).then( res =>{
        console.log(res);
        this.allData = res.data.data;
      })
    },
    /* 跳转详情页 */
    goDetail(item){
      this.$router.push({path:'/EscortColumn/rumor/detail',query:{data:JSON.stringify(item)}})
    }
  },
}
</script>

<style scoped lang="scss">
.rumor {
  &>header{
    &>img{
      width: 100%;
      height: 3.4rem;
    }
  }
  &>main{
    background-color: #ffffff;
    padding: 0 .3rem;
    &>article{
      padding: .4rem 0;
      border-bottom: 1px solid #D6D6D6;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: .32rem;
      &>img{
        width: .72rem;
        height: .72rem;
      }
    }
  }
}
</style>
