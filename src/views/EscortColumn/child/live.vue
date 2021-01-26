<template>
  <section class="live">
      <article v-for="item in allData" @click="goDetail(item)">
        <img :src="item.titleLogo" alt="视频封面">
        <p>
          <span>{{item.title}}</span>
          <span>{{item.zbCount}}次播放</span>
        </p>
      </article>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "live",
  data() {
    return {}
  },
  props:{
    allData:Array
  },
  computed: {
    ...mapGetters([])
  },
  created() {

  },
  methods: {
    goDetail(item){
      this.$store.dispatch('lineVideoNum',{
        id:item.id
      }).then(res =>{
        console.log(res)
      })
    }
  },
}
</script>

<style scoped lang="scss">
.live {
  &>article{
    margin-top: .2rem;
    &>img{
      width: 100%;
      height: 3.2rem;
    }
    &>p{
      padding: .3rem;
      background-color: #ffffff;
      display: flex;
      font-size: .3rem;
      justify-content: space-between;
      &>span:nth-of-type(2){
        color: #999999;
        font-size: .28rem;
      }
    }
  }
}
</style>
