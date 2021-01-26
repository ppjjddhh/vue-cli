<template>
  <section class="videoList">
      <article v-for="item in allData" @click="goDetail(item)">
        <img :src="item.titleLogo" alt="视频封面">
        <div>
          <p>{{item.title}}</p>
          <p>发布时间：{{item.createTime}}</p>
          <p>{{item.dspCount}}次播放</p>
        </div>
      </article>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "videoList",
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
      this.videoNums(item)
      this.$router.push({path:'/EscortColumn/escort-video-detail',query:{data:JSON.stringify(Object.assign(item,{from:2}))}})
    },
    /* 点播数量埋点 */
    videoNums(item){
      this.$store.dispatch('videoNum',{
        id:item.id
      }).then(res =>{
        console.log(res);
      })
    }
  },
}
</script>

<style scoped lang="scss">
.videoList {
  display: flex;
  flex-direction: column;
  &>article{
    background-color: #ffffff;
    padding: .3rem .2rem;
    border-top: 1px solid #D6D6D6;
    display: flex;
      &>img{
        width: 2.6rem;
        height: 1.6rem;
        margin-right: .2rem;
      }
    &>div{
      &>p{
        &:nth-of-type(1){
          font-size: .3rem;
          color: #333333;
        }
        &:nth-of-type(2),&:nth-of-type(3){
          font-size: .26rem;
          color: #666666;
        }
      }
    }
  }
}
</style>
